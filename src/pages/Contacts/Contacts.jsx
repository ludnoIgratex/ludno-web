import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import emailjs from "emailjs-com";
import styles from "./styles/Contacts.module.css";
import { RiArrowRightDownLine } from "react-icons/ri";
import { FaPinterest } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";

const Contacts = () => {
  const location = useLocation();
  const emailInputRef = useRef(null);

  useEffect(() => {
    if (location.state?.focusEmail) {
      emailInputRef.current?.focus();
    }
  }, [location.state]);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    message: "",
    checkbox: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const validateForm = () => {
    const formErrors = { email: "", message: "", checkbox: "" };
    let isValid = true;

    if (!email) {
      formErrors.email = "Заполните поле e-mail.";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formErrors.email = "Введите корректный e-mail.";
      isValid = false;
    }

    if (!message) {
      formErrors.message = "Заполните поле обращения.";
      isValid = false;
    }

    if (!isChecked) {
      formErrors.checkbox = "Вы должны согласиться на обработку данных.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSending(true);

    emailjs
      .send(
        "service_rbfbx7a",
        "template_k14q6uk",
        {
          from_email: email,
          message: message,
          to_email: "info@ludno.ru",
        },
        "H0mZhh3GnvvPTCYse"
      )
      .then(
        (result) => {
          console.log("Сообщение отправлено:", result.text);
          setIsModalOpen(true);
          setEmail("");
          setMessage("");
          setIsChecked(false);
          setErrors({ email: "", message: "", checkbox: "" });
          setIsSending(false);

          setTimeout(() => setIsModalOpen(false), 2000);
        },
        (error) => {
          console.error("Ошибка отправки email:", error.text);
          alert("Ошибка при отправке сообщения. Попробуйте еще раз.");
          setIsSending(false);
        }
      );
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.column}>
          <div className={styles.block}>
            <h4 className={styles.title}>Связаться</h4>
            <div>
              <p className={styles.text}>8 800 350 2420</p>
              <div className={styles.linkContainer}>
                <RiArrowRightDownLine className={styles.arrow} />
                <a
                  href="https://t.me/ludno_info"
                  target="_blank"
                  rel="noreferrer"
                >
                  Telegram
                </a>
              </div>
            </div>
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

        <div className={styles.column}>
          <div className={styles.blockMail}>
            <h4 className={styles.title}>Почта</h4>
            <p className={styles.text}>info@ludno.ru</p>
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.letter}>
            <div className={styles.inputGroup}>
              <input
                ref={emailInputRef}
                name="email"
                className={`${styles.input}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label className={styles.labelName}>
                <span className={styles.contentName}>Ваш e-mail</span>
              </label>
              {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>

            <section>
              <div className={styles.inputGroup}>
                <input
                  name="message"
                  className={`${styles.input}`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
                <label className={styles.labelName}>
                  <span className={styles.contentName}>Ваше обращение</span>
                </label>
                {errors.message && (
                  <p className={styles.error}>{errors.message}</p>
                )}
              </div>

              <div className={styles.checkboxGroup}>
                <div className={styles.round}>
                  <input
                    type="checkbox"
                    id="checkbox"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />
                  <label htmlFor="checkbox"></label>
                </div>
                <div className={styles.checkboxLabel}>
                  Ставя отметку, я подтверждаю согласие на обработку моих
                  персональных данных и на получение рекламно-информационных
                  рассылок.
                  {errors.checkbox && (
                    <p className={styles.error}>{errors.checkbox}</p>
                  )}
                </div>
              </div>
            </section>

            <button
              onClick={handleSubmit}
              className={styles.button}
              disabled={isSending}
            >
              {isSending ? "Отправка..." : "Отправить"}
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>
              Ваше обращение отправлено.
              <br />
              Ожидайте ответ на вашу почту.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Contacts;
