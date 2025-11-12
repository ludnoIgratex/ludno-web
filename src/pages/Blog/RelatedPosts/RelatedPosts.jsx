import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { marked } from "marked";
import { slugify } from "transliteration";
import qs from "qs";
import styles from "./styles/RelatedPosts.module.css";

const RelatedPosts = () => {
  const { id } = useParams();
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = qs.stringify({
          populate: ["image"],
        });

        const response = await fetch(
          `https://admin.ludno.ru/api/posts?${query}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        if (Array.isArray(data.data)) {
          const filteredPosts = data.data
            .filter((post) => post.id !== Number(id))
            .slice(0, 4);
          setRelatedPosts(filteredPosts);
        } else {
          console.error("Expected an array but received:", data);
        }
      } catch (error) {
        console.error("Error fetching related posts:", error);
      }
    };

    fetchPosts();
  }, [id]);

  const extractFirstH1 = (text) => {
    const tokens = marked.lexer(text);
    const h1Token = tokens.find(
      (token) => token.type === "heading" && token.depth === 1
    );
    return h1Token ? h1Token.text : "Без заголовка";
  };

  // ✨ Вспомогательная функция — берёт только первое предложение
  const getFirstSentence = (text) => {
    if (!text) return "";
    const match = text.match(/[^.!?]+[.!?]/);
    return match ? match[0].trim() : text;
  };

  return (
    <div className={styles.relatedPostsWrapper}>
      <h3>Другие статьи</h3>
      <div className={styles.relatedPostsContainer}>
        {relatedPosts.map((post) => {
          const postTitle = extractFirstH1(post.text);
          const postSlug = slugify(postTitle, { lower: true, strict: true });
          const imageUrl =
            Array.isArray(post.image) && post.image.length > 0
              ? post.image[0]?.formats?.small?.url || post.image[0]?.url || null
              : null;

          return (
            <div key={post.id} className={styles.postItem}>
              <Link to={`/blog/${post.id}/${postSlug}`}>
                <div className={styles.imageContainer}>
                  {imageUrl ? (
                    <img
                      src={`https://admin.ludno.ru${imageUrl}`}
                      alt={postTitle}
                    />
                  ) : (
                    <p>Изображение не найдено</p>
                  )}
                </div>

                <section className={styles.content}>
                  <div className={styles.mainContent}>
                    <p>{post.date}</p>
                    <h4>{postTitle}</h4>
                  </div>
                </section>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedPosts;
