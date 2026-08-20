import { SiteFooter, SiteHeader } from "../../../src/next/SiteChrome";
import SiteMap from "../../../src/pages/SiteMap/SiteMap";
import { StandardPageJsonLd } from "../../../src/next/structured-data";

const title = "Карта сайта — Людно";
const description = "Карта разделов сайта Людно: игровые и спортивные площадки, благоустройство, проектирование, безопасность, нормативы и география проектов.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/sitemap" },
  openGraph: { title, description, url: "/sitemap", siteName: "Людно", locale: "ru_RU", type: "website" },
};

export default function SiteMapPage() {
  return <div className="app__container"><SiteHeader /><SiteMap /><SiteFooter /><StandardPageJsonLd name={title} description={description} path="/sitemap/" type="CollectionPage" /></div>;
}
