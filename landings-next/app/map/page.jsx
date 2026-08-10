import { SiteFooter, SiteHeader } from "../../../src/next/SiteChrome";
import { MapNext } from "../../../src/next/LegacyNextPages";

const title = "Карта реализованных проектов | Людно";
const description = "Реализованные проекты Людно на карте: детские и спортивные площадки, общественные пространства и объекты благоустройства.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/map" },
  openGraph: { title, description, url: "/map", siteName: "Людно", locale: "ru_RU", type: "website" },
};

export default function MapPage() {
  return <div className="app__container"><SiteHeader /><main className="content"><MapNext /></main><SiteFooter /></div>;
}
