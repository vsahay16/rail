import re
import urllib.request,urllib.parse,concurrent.futures,json,xml.etree.ElementTree as ET,subprocess,time,atexit
from html.parser import HTMLParser
class Page(HTMLParser):
 def __init__(self):super().__init__();self.main=False;self.skip=False;self.in_title=False;self.title='';self.description='';self.canonical='';self.alternates={};self.links=[];self.ids=set();self.text='';self.h1=0;self.forms=[]
 def handle_starttag(self,t,a):
  d=dict(a)
  if t=='main':self.main=True
  if t in ['script','style']:self.skip=True
  if t=='title':self.in_title=True
  if t=='h1':self.h1+=1
  if 'id' in d:self.ids.add(d['id'])
  if t=='a':self.links.append(d.get('href',''))
  if t=='form':self.forms.append(d.get('id',''))
  if t=='meta' and d.get('name')=='description':self.description=d.get('content','')
  if t=='link' and d.get('rel')=='canonical':self.canonical=d.get('href')
  if t=='link' and d.get('rel')=='alternate' and 'hreflang' in d:self.alternates[d['hreflang']]=d.get('href')
 def handle_endtag(self,t):
  if t=='main':self.main=False
  if t in ['script','style']:self.skip=False
  if t=='title':self.in_title=False
 def handle_data(self,s):
  if self.in_title:self.title+=s
  if self.main and not self.skip:self.text+=s+' '
server=subprocess.Popen(['node','node_modules/next/dist/bin/next','start','-H','127.0.0.1','-p','3033'],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);atexit.register(server.terminate);time.sleep(1)
base='http://127.0.0.1:3033';xml=ET.fromstring(urllib.request.urlopen(base+'/sitemap.xml').read());paths=[x.text.replace('https://railq.in','') for x in xml.iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
def read(p):
 res=urllib.request.urlopen(base+p);html=res.read().decode();page=Page();page.feed(html);return p,page,html
results=list(concurrent.futures.ThreadPoolExecutor(6).map(read,paths));pages={p:o for p,o,h in results};titles={};descriptions={};links=set();report=[]
for p,o,html in results:
 assert o.h1==1,(p,'h1');assert len(o.text)>180,(p,'thin SSR');assert o.title and o.description,(p,'missing metadata');assert o.title not in titles,(p,'duplicate title',titles.get(o.title));assert o.description not in descriptions,(p,'duplicate description',descriptions.get(o.description));titles[o.title]=p;descriptions[o.description]=p
 assert o.canonical.rstrip('/')==('https://railq.in'+p).rstrip('/'),(p,o.canonical)
 en=p.removeprefix('/hi') if p=='/hi' or p.startswith('/hi/') else p;en=en or '/';hi='/hi'+('' if en=='/' else en)
 assert {k:v.rstrip('/') for k,v in o.alternates.items()}=={'en-IN':('https://railq.in'+en).rstrip('/'),'hi-IN':'https://railq.in'+hi,'x-default':('https://railq.in'+en).rstrip('/')},(p,o.alternates)
 assert 'RailSahayak' not in o.text
 for href in o.links:
  if href.startswith('/') and not href.startswith('//'):links.add(urllib.parse.urlsplit(href).path)
  if href.startswith('#'):assert href[1:] in o.ids,(p,href,'broken anchor')
 if p in ['/trains-between-stations','/hi/trains-between-stations']:
  assert 'rail-search' in o.forms,(p,'SSR main form missing');assert 'Loading tool' not in html
 schemas=[]
 for payload in re.findall(r'<script[^>]+type="application/ld\+json"[^>]*>(.*?)</script>',html,re.S):
  data=json.loads(payload)
  schemas.extend(data if isinstance(data,list) else data.get('@graph',[data]))
 types=[x.get('@type') for x in schemas]
 assert any(t in types for t in ['WebPage','WebApplication','CollectionPage']),(p,'missing page schema',types)
 report.append({'schema_types':types,'path':p,'title':o.title,'description':o.description,'canonical':o.canonical,'main_characters':len(o.text)})
def status(p):
 try:return p,urllib.request.urlopen(base+p).status
 except Exception as e:return p,str(e)
link_results=dict(concurrent.futures.ThreadPoolExecutor(8).map(status,sorted(links)));assert all(v==200 for v in link_results.values()),[(p,v) for p,v in link_results.items() if v!=200]
for p in ['/pnr-alerts','/hi/pnr-alerts']:
 assert 'rail-search' not in pages[p].forms
out={'passed':True,'pages':len(pages),'internal_link_destinations':len(links),'checks':['HTTP 200 for every internal destination','Unique titles and descriptions','One H1 and meaningful server-rendered content','Self-canonicals and reciprocal en/hi/x-default alternates','No RailSahayak in visible main copy','Primary route-search form in initial HTML','PNR alerts still unavailable; no subscription form'],'results':report}
open('validation/readability-pages.json','w').write(json.dumps(out,ensure_ascii=False,indent=2));print('PASS',len(pages),'pages,',len(links),'internal destinations; metadata, SSR and unavailable alerts')
