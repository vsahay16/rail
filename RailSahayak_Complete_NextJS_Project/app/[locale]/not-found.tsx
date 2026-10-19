import { Icon } from "@/components/icon";
import { LocalizedLink as Link } from "@/components/localized-link";

export default function NotFound() {
  return <main className="not-found-page">
    <div className="not-found-rail" aria-hidden="true"><span /><span /><span /></div>
    <div className="not-found-code">404</div>
    <span className="kicker"><Icon name="route" size={17} /> Route not found · रास्ता नहीं मिला</span>
    <h1>This page missed the train.<br /><em>यह पेज नहीं मिला।</em></h1>
    <p>The link may have changed. Return home or open the complete railway tools directory.</p>
    <div>
      <Link href="/" className="primary-button"><Icon name="train" size={18} /> Go to homepage</Link>
      <Link href="/tools" className="not-found-secondary"><Icon name="chart" size={18} /> View all tools</Link>
    </div>
  </main>;
}
