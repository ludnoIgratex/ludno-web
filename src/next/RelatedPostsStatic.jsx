import Link from "next/link";
import { mediaUrl, postSlug, postTitle } from "./blog-data";
import styles from "../pages/Blog/RelatedPosts/styles/RelatedPosts.module.css";
import { imageAlt } from "./image-alt";

const dateFormatter = new Intl.DateTimeFormat("ru-RU");

export default function RelatedPostsStatic({ posts }) {
  if (!posts.length) return null;
  return (
    <aside className={styles.relatedPostsWrapper}>
      <h2>Другие статьи</h2>
      <div className={styles.relatedPostsContainer}>
        {posts.map((post) => {
          const title = postTitle(post.text);
          const image = post.image?.[0];
          const imageUrl = mediaUrl(image, "small");
          return (
            <article key={post.id} className={styles.postItem}>
              <Link href={`/blog/${post.id}/${postSlug(post.text)}`}>
                {imageUrl && (
                  <div className={styles.imageContainer}>
                    <img src={imageUrl} alt={imageAlt(image?.alternativeText, title)} loading="lazy" />
                  </div>
                )}
                <div className={styles.content}>
                  <div className={styles.mainContent}>
                    {post.date && <time dateTime={post.date}>{dateFormatter.format(new Date(post.date))}</time>}
                    <h3>{title}</h3>
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </aside>
  );
}
