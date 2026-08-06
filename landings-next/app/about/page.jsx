import { SiteFooter, SiteHeader } from "../../../src/next/SiteChrome";
import { AboutNext } from "../../../src/next/LegacyNextPages";

const title = "О компании Людно — команда и производство";
const description = "Людно создаёт архитектурные игровые и спортивные пространства: разрабатывает оборудование, сотрудничает с архитекторами и реализует проекты благоустройства.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: { title, description, url: "/about", siteName: "Людно", locale: "ru_RU", type: "website" },
};

export default function AboutPage() {
  return <div className="app__container"><SiteHeader /><main className="content"><AboutNext /></main><SiteFooter /></div>;
}

