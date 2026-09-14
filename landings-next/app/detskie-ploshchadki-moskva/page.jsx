import { SiteFooter, SiteHeader } from "../../../src/next/SiteChrome";
import MoscowPlaygroundsContent from "../../../src/pages/MoscowPlaygrounds/MoscowPlaygroundsContent";
import { getMoscowProjects } from "../../../src/next/moscow-data";
import { MOSCOW_PATH, moscowTitle, moscowDescription, moscowFaq } from "../../../src/data/moscowPlaygrounds";
import { JsonLd, ORGANIZATION_ID, breadcrumbSchema, itemListSchema, webPageSchema } from "../../../src/next/structured-data";

export async function generateMetadata() {
  const projects = await getMoscowProjects();
  const image = projects[0]?.image;
  return {
    title: moscowTitle,
    description: moscowDescription,
    alternates: { canonical: MOSCOW_PATH },
    openGraph: {
      title: moscowTitle, description: moscowDescription, url: MOSCOW_PATH,
      siteName: "Людно", locale: "ru_RU", type: "website",
      images: image ? [{ url: image.src, width: image.width, height: image.height, alt: image.alt }] : [],
    },
  };
}

export default async function MoscowPage() {
  const projects = await getMoscowProjects();
  return <div className="app__container">
    <SiteHeader />
    <MoscowPlaygroundsContent projects={projects} />
    <SiteFooter />
    <JsonLd data={[
      webPageSchema({ name: moscowTitle, description: moscowDescription, path: MOSCOW_PATH }),
      breadcrumbSchema([{ name: "Главная", path: "/" }, { name: "Детские площадки в Москве", path: MOSCOW_PATH }]),
      { "@context": "https://schema.org", "@type": "Service", name: "Проектирование и производство детских площадок в Москве", url: `https://ludno.ru${MOSCOW_PATH}`, description: moscowDescription, provider: { "@id": ORGANIZATION_ID }, areaServed: [{ "@type": "City", name: "Москва" }, { "@type": "AdministrativeArea", name: "Московская область" }] },
      ...(projects.length ? [itemListSchema({ name: "Игровые объекты в Москве с участием Людно", path: MOSCOW_PATH, items: projects.map((project) => ({ name: project.label, path: project.path, image: project.image?.src })) })] : []),
      { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: moscowFaq.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) },
    ]} />
  </div>;
}
