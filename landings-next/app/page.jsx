import { SiteFooter, SiteHeader } from "../../src/next/SiteChrome";
import HomePageNext from "../../src/next/HomePageNext";
import { JsonLd, webPageSchema } from "../../src/next/structured-data";
import { getHomeProjects } from "../../src/next/project-data";

const title = "Архитектурные игровые и спортивные площадки | Людно";
const description = "Людно проектирует и производит архитектурные детские и спортивные площадки, оборудование для парков, дворов и современных общественных пространств.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Людно",
    locale: "ru_RU",
    type: "website",
    images: [{ url: "/assets/images/third.webp", alt: "Архитектурная игровая площадка | Людно" }],
  },
};

export default async function HomePage() {
  const projects = await getHomeProjects();
  return (
    <div className="app__container">
      <SiteHeader />
      <main className="content">
        <HomePageNext initialProjects={projects} />
      </main>
      <SiteFooter />
      <JsonLd data={webPageSchema({ name: title, description, path: "/" })} />
    </div>
  );
}
