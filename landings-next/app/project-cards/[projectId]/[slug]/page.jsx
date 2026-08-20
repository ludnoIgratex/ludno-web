import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";
import { SiteFooter, SiteHeader } from "../../../../../src/next/SiteChrome";
import ProjectGallery from "../../../../../src/next/ProjectGallery";
import RelatedProjectsStatic from "../../../../../src/next/RelatedProjectsStatic";
import ProjectHeroImage from "../../../../../src/next/ProjectHeroImage";
import UsedProductsStatic from "../../../../../src/next/UsedProductsStatic";
import {
  getProjectCard,
  getProjectParams,
  getRelatedProjects,
  mediaUrl,
  projectDescription,
  projectSlug,
} from "../../../../../src/next/project-data";
import styles from "../../../../../src/pages/ProjectCard/styles/ProjectCard.module.css";
import breadcrumbsStyles from "../../../../../src/pages/Projects/components/BreadCrumbs/BreadCrumbs.module.css";
import { imageAlt } from "../../../../../src/next/image-alt";
import { JsonLd, ORGANIZATION_ID, breadcrumbSchema, webPageSchema } from "../../../../../src/next/structured-data";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getProjectParams();
}

export async function generateMetadata({ params }) {
  const { projectId } = await params;
  const card = await getProjectCard(projectId);
  if (!card?.project?.name) return {};

  const name = card.project.name.trim();
  const address = card.adress?.trim();
  const slug = projectSlug(name);
  const title = address
    ? `${name}, ${address} | Детские площадки Людно`
    : `${name} | Детские площадки Людно`;
  const firstSentence = projectDescription(card.about) || `Проект «${name}».`;
  const description = `${firstSentence} | Детские площадки Людно`;
  const mainImage = Array.isArray(card.mainImage) ? card.mainImage[0] : card.mainImage;
  const imageUrl = mediaUrl(mainImage);

  return {
    title,
    description,
    alternates: { canonical: `/project-cards/${projectId}/${slug}` },
    openGraph: {
      title,
      description,
      url: `/project-cards/${projectId}/${slug}`,
      siteName: "Людно",
      locale: "ru_RU",
      type: "article",
      images: imageUrl ? [{ url: imageUrl, alt: imageAlt(mainImage?.alternativeText, name) }] : [],
    },
  };
}

export default async function ProjectPage({ params }) {
  const { projectId } = await params;
  const card = await getProjectCard(projectId);
  if (!card?.project) notFound();

  const project = card.project;
  const mainImage = Array.isArray(card.mainImage) ? card.mainImage[0] : card.mainImage;
  const mainImageUrl = mediaUrl(mainImage, "original");
  const gallery = (card.image || []).map((image, index) => ({
    url: mediaUrl(image),
    alt: imageAlt(image.alternativeText, `${project.name}, фотография ${index + 1}`),
  })).filter((image) => image.url);
  const relatedProjects = await getRelatedProjects(project.id);
  const canonicalPath = `/project-cards/${projectId}/${projectSlug(project.name)}/`;
  const canonical = `https://ludno.ru${canonicalPath}`;
  const description = projectDescription(card.about) || `Проект «${project.name}».`;
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${canonical}#project`,
    name: project.name,
    description,
    url: canonical,
    image: mainImageUrl || undefined,
    dateCreated: card.year ? String(card.year) : undefined,
    creator: { "@id": ORGANIZATION_ID },
    author: card.author ? { "@type": "Person", name: card.author } : undefined,
    locationCreated: card.adress ? { "@type": "Place", name: card.adress } : undefined,
  };

  return (
    <div className="app__container">
      <SiteHeader />
      <main className="content">
        <article className={styles.card}>
          <div className={styles.breadcrumbs}>
            <nav className={breadcrumbsStyles.breadcrumbs} aria-label="Хлебные крошки">
              <ul><li><Link href="/projects">Проекты</Link></li><li>{project.name}</li></ul>
            </nav>
          </div>

          {mainImageUrl && (
            <ProjectHeroImage src={mainImageUrl} alt={imageAlt(mainImage?.alternativeText, project.name)} />
          )}

          <section className={styles.cardContainer}>
            <h1>{project.name}</h1>
            <div className={styles.infoWrapper}>
              <section className={`${styles.about} markdown`}>
                <h3>Описание проекта</h3>
                <div dangerouslySetInnerHTML={{ __html: marked.parse(card.about || "", { breaks: true }) }} />
              </section>
              <section className={`${styles.equipment} markdown`}>
                <h3>Оборудование</h3>
                <div dangerouslySetInnerHTML={{ __html: marked.parse(card.equipment || "", { breaks: true }) }} />
              </section>
              <section className={styles.address}>
                {card.adress && <div><span className={styles.label}>Адрес</span><p>{card.adress}</p></div>}
                {card.year && <div><span className={styles.label}>Год</span><p>{card.year}</p></div>}
              </section>
              <section className={styles.client}>
                {card.client && <div><span className={styles.label}>Заказчик</span><p>{card.client}</p></div>}
                {card.author && <div><span className={styles.label}>Автор концепции</span><p>{card.author}</p></div>}
                {project.project_type?.name && <div><span className={styles.label}>Тип</span><p>{project.project_type.name}</p></div>}
              </section>
            </div>
          </section>

          <ProjectGallery images={gallery} />
          <UsedProductsStatic products={card.products} />
          <RelatedProjectsStatic projects={relatedProjects} />
        </article>
      </main>
      <SiteFooter />
      <JsonLd data={[
        projectSchema,
        webPageSchema({ name: project.name, description, path: canonicalPath, type: "ItemPage" }),
        breadcrumbSchema([{ name: "Главная", path: "/" }, { name: "Проекты", path: "/projects/" }, { name: project.name, path: canonicalPath }]),
      ]} />
    </div>
  );
}
