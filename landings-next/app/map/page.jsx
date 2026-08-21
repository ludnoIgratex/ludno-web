import { SiteFooter, SiteHeader } from "../../../src/next/SiteChrome";
import { MapNext } from "../../../src/next/LegacyNextPages";
import { StandardPageJsonLd } from "../../../src/next/structured-data";

const title = "Карта реализованных проектов | Людно";
const description = "Реализованные проекты Людно на карте: детские и спортивные площадки, общественные пространства и объекты благоустройства.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/map" },
  openGraph: { title, description, url: "/map", siteName: "Людно", locale: "ru_RU", type: "website" },
};

export default function MapPage() {
  return <div className="app__container"><SiteHeader /><main className="content"><h1 className="seo-visually-hidden">Реализованные проекты Людно на карте</h1><MapNext /></main><SiteFooter /><StandardPageJsonLd name={title} description={description} path="/map/" type="CollectionPage" /></div>;
}
