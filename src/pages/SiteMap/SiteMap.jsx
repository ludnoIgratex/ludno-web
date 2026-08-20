import React from "react";
import { siteMapLinkCount, siteMapSections } from "../../data/siteMapData";
import styles from "./SiteMap.module.css";

export default function SiteMap() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>Навигация по Людно</p>
        <h1>Карта сайта</h1>
        <div className={styles.intro}>
          <p>
            Оборудование, проектирование, городские решения, нормативы и география —
            все направления работы Людно в одном месте.
          </p>
          <span>{siteMapLinkCount} направлений</span>
        </div>
      </header>

      <div className={styles.sections}>
        {siteMapSections.map((section, sectionIndex) => (
          <section className={styles.section} key={section.title}>
            <div className={styles.sectionTitle}>
              <span>{String(sectionIndex + 1).padStart(2, "0")}</span>
              <h2>{section.title}</h2>
            </div>
            <div className={styles.groups}>
              {section.groups.map((group) => (
                <div className={styles.group} key={group.title}>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.links.map((item) => (
                      <li key={`${item.href}-${item.title}`}>
                        <a href={item.href}>{item.title}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
