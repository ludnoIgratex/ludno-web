import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles/Contacts.module.css";
import { RiArrowRightDownLine } from "react-icons/ri";
import { FaPinterest, FaTelegram } from "react-icons/fa";

const MAX_LINK =
  "https://max.ru/u/f9LHodD0cOLgjnSqWeNNcx7AhWxWIPge9c-T-WNnLM1h4WJNTgle2DKimNs";

const Contacts = () => {
  const [form, setForm] = useState({ name: "", email: "", consent: false });
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(true);

  useEffect(() => {
    if (!isNewsletterOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsNewsletterOpen(false);
    };
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isNewsletterOpen]);

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

      setStatus("success");
      setMessage(data.message || "Готово! Вы подписаны на рассылку.");
      setForm({ name: "", email: "", consent: false });
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
            <a href="https://t.me/ludno_x" target="_blank" rel="noreferrer">
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

      {isNewsletterOpen && (
        <div
          className={styles.modalBackdrop}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsNewsletterOpen(false);
            }
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
              onClick={() => setIsNewsletterOpen(false)}
              aria-label="Закрыть"
            >
              ×
            </button>

            <p className={styles.newsletterDescription}>
              Новости, новые проекты и полезные материалы — без спама.
            </p>

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
                  name="consent"
                  checked={form.consent}
                  onChange={handleChange}
                  required
                />
                <span>
                  Соглашаюсь получать рассылку и на{" "}
                  <Link to="/policy">обработку персональных данных</Link>
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
      )}
    </div>
  );
};

export default Contacts;
