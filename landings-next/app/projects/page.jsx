import { SiteFooter, SiteHeader } from "../../../src/next/SiteChrome";
import ProjectsCatalog from "../../../src/next/ProjectsCatalog";
import { getProjects, getProjectTypes, mediaUrl, projectSlug } from "../../../src/next/project-data";
import { JsonLd, breadcrumbSchema, itemListSchema, webPageSchema } from "../../../src/next/structured-data";

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
      <JsonLd data={[
        webPageSchema({ name: metadata.title, description: metadata.description, path: "/projects/", type: "CollectionPage" }),
        breadcrumbSchema([{ name: "Главная", path: "/" }, { name: "Проекты", path: "/projects/" }]),
        itemListSchema({ name: "Реализованные проекты Людно", path: "/projects/", items: projects.map((project) => ({ name: project.name, path: `/project-cards/${project.id}/${projectSlug(project.name)}/`, image: mediaUrl(project.image?.[0], "medium") })) }),
      ]} />
    </div>
  );
}
