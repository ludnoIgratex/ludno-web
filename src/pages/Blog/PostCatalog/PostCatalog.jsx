import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { slugify } from "transliteration";
import { marked } from "marked";
import qs from "qs";
import styles from "./styles/PostCatalog.module.css";

const PostCatalog = ({ selectedTags }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = qs.stringify({
          populate: ["image", "post_tags"],
        });

        const response = await fetch(
          `https://admin.ludno.ru/api/posts?${query}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        if (Array.isArray(data.data)) {
          setPosts(data.data);
        } else {
          console.error("Expected an array but received:", data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const extractFirstH1 = (text) => {
    const tokens = marked.lexer(text);
    const h1Token = tokens.find(
      (token) => token.type === "heading" && token.depth === 1
    );
    return h1Token ? h1Token.text : null;
  };

  const filteredPosts = selectedTags.length
    ? posts.filter((post) =>
        post.post_tags.some((tag) => selectedTags.includes(tag.name))
      )
    : posts;

  return (
    <div className={styles.postCatalogWrapper}>
      <div className={styles.postCatalogContainer}>
        {filteredPosts.length > 0
          ? filteredPosts.map((post) => {
              const postSlug = slugify(extractFirstH1(post.text), {
                lower: true,
                strict: true,
              });

              const imageUrl =
                Array.isArray(post.image) && post.image.length > 0
                  ? post.image[0]?.url
                  : null;

              const postTitle = extractFirstH1(post.text);

              return (
                <div key={post.id} className={styles.postPreview}>
                  <Link to={`/blog/${post.id}/${postSlug}`}>
                    <div className={styles.imageWrapper}>
                      {imageUrl ? (
                        <img
                          loading="lazy"
                          src={`https://admin.ludno.ru${imageUrl}`}
                          alt={postTitle || "Изображение статьи"}
                        />
                      ) : (
                        <p>Изображение не найдено</p>
                      )}
                      <div className={styles.tagsOverlay}>
                        {post.post_tags.map((tag) => (
                          <span key={tag.id} className={styles.tag}>
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className={styles.previewInfo}>
                      <h4>{postTitle}</h4>
                      <p>{post.description}</p>
                      <p className={styles.date}>
                        {new Date(post.date).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default PostCatalog;
