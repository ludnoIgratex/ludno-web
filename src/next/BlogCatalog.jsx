"use client";

import { useState } from "react";
import Link from "next/link";
import { mediaUrl, postSlug, postTitle } from "./blog-data";
import styles from "../pages/Blog/styles/Blog.module.css";
import catalogStyles from "../pages/Blog/PostCatalog/styles/PostCatalog.module.css";
import tagStyles from "../pages/Blog/PostTag/styles/PostTag.module.css";
import { imageAlt } from "./image-alt";

const dateFormatter = new Intl.DateTimeFormat("ru-RU");

export default function BlogCatalog({ posts, tags }) {
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (name) => {
    setSelectedTags((current) =>
      current.includes(name)
        ? current.filter((tag) => tag !== name)
        : [...current, name]
    );
  };

  const filteredPosts = selectedTags.length
    ? posts.filter((post) =>
        post.post_tags?.some((tag) => selectedTags.includes(tag.name))
      )
    : posts;

  return (
    <div className={styles.blogWrapper}>
      <h1>Каталог статей</h1>
      <div className={tagStyles.tagsWrapper} aria-label="Темы статей">
        {tags.map((tag) => (
          <button
            type="button"
            key={tag.id}
            onClick={() => toggleTag(tag.name)}
            className={selectedTags.includes(tag.name) ? tagStyles.active : ""}
            aria-pressed={selectedTags.includes(tag.name)}
          >
            {tag.name}
          </button>
        ))}
      </div>

      <section className={catalogStyles.postCatalogWrapper} aria-label="Статьи Людно">
        <div className={catalogStyles.postCatalogContainer}>
          {filteredPosts.map((post) => {
            const title = postTitle(post.text);
            const image = post.image?.[0];
            const imageUrl = mediaUrl(image, "medium");
            return (
              <article key={post.id} className={catalogStyles.postPreview}>
                <Link href={`/blog/${post.id}/${postSlug(post.text)}`}>
                  <div className={catalogStyles.imageWrapper}>
                    {imageUrl && (
                      <img
                        loading="lazy"
                        src={imageUrl}
                        alt={imageAlt(image?.alternativeText, title)}
                      />
                    )}
                    <div className={catalogStyles.tagsOverlay}>
                      {post.post_tags?.map((tag) => (
                        <span key={tag.id} className={catalogStyles.tag}>{tag.name}</span>
                      ))}
                    </div>
                  </div>
                  <div className={catalogStyles.previewInfo}>
                    <h2>{title}</h2>
                    {post.description && <p>{post.description}</p>}
                    {post.date && (
                      <time className={catalogStyles.date} dateTime={post.date}>
                        {dateFormatter.format(new Date(post.date))}
                      </time>
                    )}
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
