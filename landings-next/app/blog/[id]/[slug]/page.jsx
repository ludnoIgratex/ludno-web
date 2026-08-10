import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../../../../src/next/SiteChrome";
import PostContent from "../../../../../src/next/PostContent";
import RelatedPostsStatic from "../../../../../src/next/RelatedPostsStatic";
import {
  getPost,
  getPostParams,
  getRelatedPosts,
  mediaUrl,
  postSlug,
  postTitle,
} from "../../../../../src/next/blog-data";
import styles from "../../../../../src/pages/Blog/PostPage/styles/PostPage.module.css";
import breadcrumbsStyles from "../../../../../src/pages/Blog/BreadCrumbs/styles/BreadCrumbs.module.css";
import { imageAlt } from "../../../../../src/next/image-alt";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getPostParams();
}

function cleanDescription(value = "") {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (text.length <= 160) return text;

  const firstSentence = text.match(/^.*?[.!?](?=\s|$)/)?.[0];
  if (firstSentence && firstSentence.length >= 70 && firstSentence.length <= 160) {
    return firstSentence;
  }

  const shortened = text.slice(0, 157);
  return `${shortened.slice(0, shortened.lastIndexOf(" ")).replace(/[,:;–—-]+$/, "")}…`;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) return {};
  const heading = postTitle(post.text);
  const title = `${heading} | Блог Людно`;
  const description = cleanDescription(post.description) || `Статья Людно: ${heading}.`;
  const canonical = `/blog/${post.id}/${postSlug(post.text)}`;
  const image = post.image?.[0];
  const imageUrl = mediaUrl(image);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Людно",
      locale: "ru_RU",
      type: "article",
      publishedTime: post.publishedAt || post.date,
      modifiedTime: post.updatedAt,
      tags: post.post_tags?.map((tag) => tag.name) || [],
      images: imageUrl ? [{ url: imageUrl, alt: imageAlt(image?.alternativeText, heading) }] : [],
    },
  };
}

const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

export default async function PostPage({ params }) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) notFound();
  const title = postTitle(post.text);
  const date = post.date ? new Date(`${post.date}T00:00:00`) : null;
  const relatedPosts = await getRelatedPosts(post.id);

  return (
    <div className="app__container">
      <SiteHeader />
      <main className="content">
        <article className={styles.postWrapper}>
          <nav className={breadcrumbsStyles.breadcrumbs} aria-label="Хлебные крошки">
            <ul><li><Link href="/blog">Блог</Link></li><li>{title}</li></ul>
          </nav>

          <section className={styles.tagsContainer} aria-label="Темы статьи">
            <div className={styles.tagsWrapper}>
              {post.post_tags?.map((tag) => <span key={tag.id} className={styles.tag}>{tag.name}</span>)}
            </div>
          </section>

          <header className={styles.postTitleWrapper}>
            {post.date && (
              <time className={styles.dateWrapper} dateTime={post.date}>
                <span className={styles.day}>{date.getDate()}</span>
                <span className={styles.month}>{months[date.getMonth()]}</span>
                <span className={styles.year}>{date.getFullYear()}</span>
              </time>
            )}
            <h1>{title}</h1>
          </header>

          <section className={styles.contentWrapper}>
            {post.description && <p className={styles.description}>{post.description}</p>}
            <div className={styles.markdownContent}><PostContent text={post.text || ""} /></div>
          </section>

          <RelatedPostsStatic posts={relatedPosts} />
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
