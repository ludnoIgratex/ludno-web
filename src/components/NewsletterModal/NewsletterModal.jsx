import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NewsletterModal.module.css";

const SHOW_DELAY_MS = 20_000;
const DISMISS_FOR_MS = 30 * 24 * 60 * 60 * 1000;
const DISMISSED_AT_KEY = "ludno_newsletter_dismissed_at";
const SUBSCRIBED_KEY = "ludno_newsletter_subscribed";

function NewsletterModal() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    personalDataConsent: false,
    marketingConsent: false,
  });
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const isSubscribed = localStorage.getItem(SUBSCRIBED_KEY) === "true";
    const dismissedAt = Number(localStorage.getItem(DISMISSED_AT_KEY)) || 0;
    const dismissalIsActive = Date.now() - dismissedAt < DISMISS_FOR_MS;

    if (isSubscribed || dismissalIsActive) return undefined;

    const timer = window.setTimeout(() => setIsOpen(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeModal();
    };
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const closeModal = () => {
    localStorage.setItem(DISMISSED_AT_KEY, String(Date.now()));
    setIsOpen(false);
  };

  const handleChange = ({ target }) => {
    const value = target.type === "checkbox" ? target.checked : target.value;
    setForm((current) => ({ ...current, [target.name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
      localStorage.removeItem(DISMISSED_AT_KEY);
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

  if (!isOpen) return null;

  return (
    <div
      className={styles.backdrop}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeModal();
      }}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label="Подписка на рассылку"
      >
        <button
          className={styles.close}
          type="button"
          onClick={closeModal}
          aria-label="Закрыть"
        >
          ×
        </button>

        <h2 className={styles.title}>Подпишитесь на новости</h2>

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
              autoFocus
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
              Ставя отметку, я даю{" "}
              <Link to="/policy" onClick={closeModal}>
                согласие на обработку моих персональных данных
              </Link>
              {" "}(Федеральный закон № 152-ФЗ «О персональных данных»).
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
            <span>
              Ставя отметку, я даю согласие на получение
              рекламно-информационных рассылок (Федеральный закон № 38-ФЗ «О
              рекламе»).
            </span>
          </label>

          <button
            className={styles.submit}
            type="submit"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Отправляем…" : "Подписаться"}
          </button>

          {message && (
            <p
              className={
                status === "success" ? styles.success : styles.error
              }
              role="status"
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default NewsletterModal;
