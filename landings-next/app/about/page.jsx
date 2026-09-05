import { SiteFooter, SiteHeader } from "../../../src/next/SiteChrome";
import { AboutNext } from "../../../src/next/LegacyNextPages";
import { StandardPageJsonLd } from "../../../src/next/structured-data";
import { getTeam } from "../../../src/next/team-data";

const title = "О компании Людно — команда и производство";
const description = "Людно создаёт архитектурные игровые и спортивные пространства: разрабатывает оборудование, сотрудничает с архитекторами и реализует проекты благоустройства.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: { title, description, url: "/about", siteName: "Людно", locale: "ru_RU", type: "website" },
};

export default async function AboutPage() {
  const initialTeam = await getTeam();
  return <div className="app__container"><SiteHeader /><main className="content"><h1 className="seo-visually-hidden">О компании Людно</h1><AboutNext initialTeam={initialTeam} /></main><SiteFooter /><StandardPageJsonLd name={title} description={description} path="/about/" type="AboutPage" /></div>;
}
