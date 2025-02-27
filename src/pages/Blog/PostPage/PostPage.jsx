import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { marked } from "marked";
import qs from "qs";
import { slugify } from "transliteration";
import styles from "./styles/PostPage.module.css";
import LoaderRound from "../../../components/Loader/LoaderRound";
import RelatedPosts from "../RelatedPosts/RelatedPosts";
import { FaPinterest } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const query = qs.stringify(
          {
            filters: { id: { $eq: id } },
            populate: ["post_tags"],
          },
          { encode: false }
        );
        const response = await fetch(
          `https://admin.ludno.ru/api/posts?${query}`
        );
        if (!response.ok)
          throw new Error(`Network response was not ok: ${response.status}`);
        const data = await response.json();
        setPost(data.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <LoaderRound show={true} />;

  const { text, post_tags } = post;
  const postText = text || "";

  const renderer = new marked.Renderer();

  renderer.blockquote = function (token) {
    const check = (token.text || "").trim().toLowerCase();
    if (check === "quote") return "{{quote}}";
    const inner = this.parser.parse(token.tokens, this.options);
    return `<blockquote>${inner}</blockquote>`;
  };

  const tokens = marked.lexer(postText);
  const h1Index = tokens.findIndex(
    (t) => t.type === "heading" && t.depth === 1
  );
  let h1Token = null;
  if (h1Index !== -1) {
    h1Token = tokens[h1Index];
    tokens.splice(h1Index, 1);
  }

  const restHtml = marked.parser(tokens, { renderer });
  const extractedH1Text = h1Token ? h1Token.text : "";
  const postSlug = slugify(extractedH1Text, { lower: true, strict: true });

  const formatDate = (dateString) => {
    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: months[date.getMonth()],
      year: date.getFullYear(),
    };
  };

  const { day, month, year } = formatDate(post.date);

  const parts = restHtml.split("{{quote}}");
  const finalContent = parts.map((part, i) => (
    <React.Fragment key={i}>
      <div dangerouslySetInnerHTML={{ __html: part }} />
      {i < parts.length - 1 && (
        <div className={styles.quoteContainer}>
          <div className={styles.quoteWrapper}>
            <div className={styles.quoteLinksContainer}>
              <a
                href="https://www.pinterest.com/ludnoru"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaPinterest />
                Pinterest
              </a>
              <a
                href="https://t.me/ludnoo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTelegram />
                Telegram
              </a>
            </div>
            <p>Это наши соцсети, там еще больше интересной информации</p>
          </div>
        </div>
      )}
    </React.Fragment>
  ));

  return (
    <div className={styles.postWrapper}>
      <section className={styles.tagsContainer}>
        <div className={styles.tagsWrapper}>
          {Array.isArray(post_tags) &&
            post_tags.map((tag) => (
              <span key={tag.id} className={styles.tag}>
                {tag.name}
              </span>
            ))}
        </div>
      </section>
      <section className={styles.postTitleWrapper}>
        <div className={styles.dateWrapper}>
          <span className={styles.day}>{day}</span>
          <span className={styles.month}>{month}</span>
          <span className={styles.year}>{year}</span>
        </div>
        {h1Token && <h1>{h1Token.text}</h1>}
      </section>

      <section className={styles.contentWrapper}>
        <p className={styles.description}>{post.description}</p>
        <div className={styles.markdownContent}>{finalContent}</div>
      </section>

      <RelatedPosts />
    </div>
  );
};

export default PostPage;
