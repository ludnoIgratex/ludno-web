import styles from "../../../../../src/pages/ProjectCard/styles/ProjectCard.module.css";
import { SiteFooter, SiteHeader } from "../../../../../src/next/SiteChrome";

export default function ProjectCardLoading() {
  return (
    <div className="app__container">
      <SiteHeader />
      <main className="content" aria-label="Загрузка проекта">
        <article className={styles.card}>
          <div className={styles.breadcrumbs} />
          <div className={styles.imageWrapper}>
            <div className={styles.skeleton} aria-hidden="true" />
          </div>
          <section className={styles.cardContainer}>
            <div className={styles.skeletonText} />
            <div className={styles.skeletonContent} />
          </section>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
