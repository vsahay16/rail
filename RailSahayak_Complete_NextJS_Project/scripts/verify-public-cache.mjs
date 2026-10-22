/** Run after npm run build. Starts an isolated local production server. */
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
const port = process.env.CACHE_TEST_PORT || '3016';
const base = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', port], { stdio: 'ignore' });
const read = async (path, options) => {
  const response = await fetch(base + path, options);
  return { response, html: await response.text() };
};
try {
  let ready = false;
  for (let i = 0; i < 80; i++) {
    try { await fetch(base + '/robots.txt'); ready = true; break; } catch { await new Promise(resolve => setTimeout(resolve, 100)); }
  }
  assert(ready, 'Production server failed to start');
  const sitemap = (await read('/sitemap.xml')).html;
  const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).pathname);
  assert.equal(paths.length, 148);
  const reports = [];
  let next = 0;
  await Promise.all(Array.from({ length: 6 }, async () => {
    while (next < paths.length) {
      const path = paths[next++];
      const { response, html } = await read(path);
      assert.equal(response.status, 200, path);
      assert.match(response.headers.get('cache-control') || '', /s-maxage=3600/, `${path}: HTML should use the public ISR cache`);
      const locale = path === '/hi' || path.startsWith('/hi/') ? 'hi-IN' : 'en-IN';
      assert(html.includes(`lang="${locale}"`), `${path}: wrong document language`);
      const canonical = /<link rel="canonical" href="([^"]+)"/.exec(html)?.[1];
      assert.equal(new URL(canonical).pathname.replace(/\/$/, ''), path.replace(/\/$/, ''), `${path}: wrong canonical`);
      assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${path}: H1 count`);
      assert(!/href="https:\/\/railq.in\/en(?:\/|")/.test(html), `${path}: internal locale leaked into canonical links`);
      reports.push({ path, status: response.status, cache: response.headers.get('cache-control'), locale, title: /<title>(.*?)<\/title>/.exec(html)?.[1] });
    }
  }));
  assert.equal(new Set(reports.map(item => item.title)).size, paths.length, 'Titles must remain unique');
  // English remains English even if an untrusted request spoofs the old header.
  const spoofed = await read('/pnr-status', { headers: { 'x-railsahayak-language': 'hi' } });
  assert(spoofed.html.includes('lang="en-IN"'));
  for (const path of ['/en', '/en/pnr-status']) {
    const { response } = await read(path, { redirect: 'manual' });
    assert.equal(response.status, 308);
    assert.equal(new URL(response.headers.get('location'), base).pathname, path.slice(3) || '/');
  }
  // Cached HTML must not contain arbitrary request values or personal results.
  const token = 'CACHE_ISOLATION_TEST';
  const withQuery = await read(`/pnr-status?pnr=${token}`);
  assert(!withQuery.html.includes(token));
  const formQuery = await read('/chart-preparation-calculator?departure=CACHE_ISOLATION_TEST');
  assert(!formQuery.html.includes(token));
  for (const path of ['/train/12951', '/hi/train/12951', '/admin/service-health']) {
    const { response } = await read(path);
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get('cache-control') || '', /no-store/, `${path}: dynamic route must remain uncached`);
  }
  // Invalid requests exercise privacy headers without looking up a real ticket.
  for (const [path, options] of [
    ['/api/rail?action=pnr', {}],
    ['/api/rail', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action: 'pnr', pnr: 'invalid' }) }],
  ]) {
    const { response } = await read(path, options);
    assert(response.status >= 400, 'Invalid PNR request should fail');
    assert.match(response.headers.get('cache-control') || '', /no-store/, 'API errors must not be cached');
  }
  // RSC is a different representation; Next.js owns its cache keys and Vary.
  const rsc = await read('/pnr-status', { headers: { RSC: '1' } });
  assert.match(rsc.response.headers.get('content-type') || '', /text\/x-component/);
  assert.match(rsc.response.headers.get('vary') || '', /RSC/i);
  const afterRsc = await read('/pnr-status');
  assert.match(afterRsc.response.headers.get('content-type') || '', /text\/html/);
  const unknown = await read('/hi/not-a-real-railq-page');
  assert.equal(unknown.response.status, 404);
  reports.sort((a, b) => a.path.localeCompare(b.path));
  await writeFile('validation/public-cache-check.json', JSON.stringify({ pages: paths.length, passed: true, checks: ['public HTML cache', 'locale isolation', 'canonical URLs', 'unique titles', 'H1 count', 'internal locale redirects', 'query isolation', 'dynamic routes no-store', 'invalid PNR API no-store', 'RSC/HTML separation', '404 status'], results: reports }, null, 2));
  console.log(`PASS: ${paths.length} public pages cached; locale, metadata, redirects, query isolation, API privacy and RSC checks passed.`);
} finally {
  server.kill('SIGTERM');
}
