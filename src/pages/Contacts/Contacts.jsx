import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import emailjs from "emailjs-com";
import styles from "./styles/Contacts.module.css";
import { RiArrowRightDownLine } from "react-icons/ri";
import { FaPinterest, FaTelegram } from "react-icons/fa";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValidEmail = (v) => emailRegex.test(v);

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

  const [agreePD, setAgreePD] = useState(false);   // обязательная
  const [agreeAds, setAgreeAds] = useState(false); // опциональная

  const [errors, setErrors] = useState({
    email: "",
    message: "",
    checkboxPD: "",
    checkboxAds: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const validateForm = () => {
    const formErrors = { email: "", message: "", checkboxPD: "", checkboxAds: "" };
    let isValid = true;

    if (!email) {
      formErrors.email = "Заполните поле e-mail.";
      isValid = false;
    } else if (!isValidEmail(email)) {
      formErrors.email = "Введите корректный e-mail.";
      isValid = false;
    }

    if (!message) {
      formErrors.message = "Заполните поле обращения.";
      isValid = false;
    }

    if (!agreePD) {
      formErrors.checkboxPD = "Вы должны согласиться на обработку персональных данных.";
      isValid = false;
    }

    // agreeAds — опциональна, ошибки не ставим
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
          // В шаблоне EmailJS используйте {{reply_to}} как Reply-To,
          // чтобы не конфликтовать с DMARC у Яндекса
          reply_to: email,
          from_email: email, // на случай, если у вас уже так настроен шаблон
          message: message,
          to_email: "info@ludno.ru",
          agree_pd: agreePD ? "yes" : "no",
          agree_ads: agreeAds ? "yes" : "no",
        },
        "H0mZhh3GnvvPTCYse"
      )
      .then(
        () => {
          setIsModalOpen(true);
          setEmail("");
          setMessage("");
          setAgreePD(false);
          setAgreeAds(false);
          setErrors({ email: "", message: "", checkboxPD: "", checkboxAds: "" });
          setIsSending(false);
          setTimeout(() => setIsModalOpen(false), 2000);
        },
        (error) => {
          console.error("Ошибка отправки email:", error?.text || error);
          alert("Ошибка при отправке сообщения. Попробуйте еще раз.");
          setIsSending(false);
        }
      );
  };

  // disabled: если отправляется, либо пустой/некорректный email, пустое обращение, либо не отмечена 1-я галочка
  const isSubmitDisabled =
    isSending || !email || !isValidEmail(email) || !message || !agreePD;

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
                <a href="https://t.me/ludno_info" target="_blank" rel="noreferrer">
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
              <a href="https://www.pinterest.com/ludnoru" target="_blank" rel="noreferrer">
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
                type="email"
                name="email"
                className={styles.input}
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
                  className={styles.input}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
                <label className={styles.labelName}>
                  <span className={styles.contentName}>Ваше обращение</span>
                </label>
                {errors.message && <p className={styles.error}>{errors.message}</p>}
              </div>

              {/* 🔹 Чекбокс 1: ПД с ссылкой на /policy (обязательный) */}
              <div className={styles.checkboxGroup}>
                <div className={styles.round}>
                  <input
                    type="checkbox"
                    id="agreePD"
                    checked={agreePD}
                    onChange={(e) => setAgreePD(e.target.checked)}
                  />
                  <label htmlFor="agreePD"></label>
                </div>
                <div className={styles.checkboxLabel}>
                  Ставя отметку, я даю{" "}
                  <a href="/policy" target="_blank" rel="noreferrer" className={styles.link}>
                    согласие на обработку моих персональных данных
                  </a>{" "}
                  (Федеральный закон № 152-ФЗ «О персональных данных»).
                  {errors.checkboxPD && <p className={styles.error}>{errors.checkboxPD}</p>}
                </div>
              </div>

              {/* 🔹 Чекбокс 2: рекламная рассылка (опциональный) */}
              <div className={styles.checkboxGroup} style={{ marginTop: 8 }}>
                <div className={styles.round}>
                  <input
                    type="checkbox"
                    id="agreeAds"
                    checked={agreeAds}
                    onChange={(e) => setAgreeAds(e.target.checked)}
                  />
                  <label htmlFor="agreeAds"></label>
                </div>
                <div className={styles.checkboxLabel}>
                  Согласен на получение рекламно-информационных рассылок (Федеральный закон № 38-ФЗ «О рекламе»).
                  {errors.checkboxAds && <p className={styles.error}>{errors.checkboxAds}</p>}
                </div>
              </div>
            </section>

            <button
              onClick={handleSubmit}
              className={styles.button}
              disabled={isSubmitDisabled}
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
