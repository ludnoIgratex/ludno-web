import { SiteFooter, SiteHeader } from "../../../src/next/SiteChrome";
import ProjectsCatalog from "../../../src/next/ProjectsCatalog";
import { getProjects, getProjectTypes } from "../../../src/next/project-data";

export const metadata = {
  title: "Реализованные проекты благоустройства | Людно",
  description: "Реализованные проекты Людно: детские игровые и спортивные площадки, общественные пространства, зоны отдыха и площадки для выгула собак.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Реализованные проекты благоустройства | Людно",
    description: "Реализованные проекты Людно: детские игровые и спортивные площадки, общественные пространства, зоны отдыха и площадки для выгула собак.",
    url: "/projects",
    siteName: "Людно",
    locale: "ru_RU",
    type: "website",
  },
};

export default async function ProjectsPage() {
  const [projects, projectTypes] = await Promise.all([
    getProjects(),
    getProjectTypes(),
  ]);

  return (
    <div className="app__container">
      <SiteHeader />
      <main className="content">
        <ProjectsCatalog projects={projects} projectTypes={projectTypes} />
      </main>
      <SiteFooter />
    </div>
  );
}
