import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles/Contacts.module.css";
import { RiArrowRightDownLine } from "react-icons/ri";
import { FaPinterest, FaTelegram } from "react-icons/fa";

const MAX_LINK =
  "https://max.ru/u/f9LHodD0cOLgjnSqWeNNcx7AhWxWIPge9c-T-WNnLM1h4WJNTgle2DKimNs";
const SUBSCRIBED_KEY = "ludno_newsletter_subscribed";

const Contacts = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    personalDataConsent: false,
    marketingConsent: false,
  });
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
  const canSubmit =
    form.name.trim().length > 0 &&
    emailIsValid &&
    form.personalDataConsent &&
    form.marketingConsent &&
    status !== "loading";

  const handleChange = ({ target }) => {
    const value = target.type === "checkbox" ? target.checked : target.value;
    setForm((current) => ({ ...current, [target.name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmit) return;

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Не удалось оформить подписку.");
      }

      localStorage.setItem(SUBSCRIBED_KEY, "true");
      setStatus("success");
      setMessage(data.message || "Готово! Вы подписаны на рассылку.");
      setForm({
        name: "",
        email: "",
        personalDataConsent: false,
        marketingConsent: false,
      });
    } catch (error) {
      setStatus("error");
      setMessage(error.message);
    }
  };

  return (
    <div className={styles.container}>
      {/* Левая колонка: телефон + соцсети ниже */}
      <div className={styles.column}>
        <div className={styles.block}>
          <h4 className={styles.title}>Связаться</h4>
          <p className={styles.text}>8 800 350 24 20</p>
        </div>

        <div className={styles.block}>
          <h4 className={styles.title}>Социальные сети</h4>
          <div className={styles.links}>
            <a href="https://t.me/ludnoo" target="_blank" rel="noreferrer">
              <FaTelegram />
            </a>
            <a
              href="https://www.pinterest.com/ludnoru"
              target="_blank"
              rel="noreferrer"
            >
              <FaPinterest />
            </a>
          </div>
        </div>
      </div>

      {/* Средняя колонка: ссылки (стрелка + текст) */}
      <div className={styles.column}>
        <div className={styles.block}>
          <div className={styles.linkContainer}>
            <RiArrowRightDownLine className={styles.arrow} />
            <a
              href="https://t.me/ludno_x"
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              Telegram
            </a>
          </div>
          <div className={styles.linkContainer}>
            <RiArrowRightDownLine className={styles.arrow} />
            <a
              href="https://wa.me/79150831244"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              aria-label="Открыть чат WhatsApp"
            >
              Whatsapp
            </a>
          </div>
          <div className={styles.linkContainer}>
            <RiArrowRightDownLine className={styles.arrow} />
            <a
              href={MAX_LINK}
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              Max
            </a>
          </div>
        </div>
      </div>

      {/* Правая колонка: почта */}
      <div className={styles.column}>
        <div className={styles.blockMail}>
          <h4 className={styles.title}>Почта</h4>
          <p className={styles.text}>info@ludno.ru</p>
        </div>
      </div>

      <section className={styles.newsletter} aria-labelledby="newsletter-title">
        <h2 className={styles.newsletterTitle} id="newsletter-title">
          Подпишитесь на новости
        </h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>Имя</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              maxLength="100"
              required
            />
          </label>

          <label className={styles.field}>
            <span>Почта</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              maxLength="254"
              required
            />
          </label>

          <label className={styles.consent}>
            <input
              type="checkbox"
              name="personalDataConsent"
              checked={form.personalDataConsent}
              onChange={handleChange}
              required
            />
            <span>
              Я даю{" "}
              <Link to="/policy">
                согласие на обработку персональных данных
              </Link>
              .
            </span>
          </label>

          <label className={styles.consent}>
            <input
              type="checkbox"
              name="marketingConsent"
              checked={form.marketingConsent}
              onChange={handleChange}
              required
            />
            <span>Я согласен получать рекламно-информационные рассылки.</span>
          </label>

          <button
            className={styles.submit}
            type="submit"
            disabled={!canSubmit}
          >
            {status === "loading" ? "Отправляем…" : "Подписаться"}
          </button>

          {message && (
            <p
              className={status === "success" ? styles.success : styles.error}
              role="status"
            >
              {message}
            </p>
          )}
        </form>
      </section>
    </div>
  );
};

export default Contacts;
