"use client";

import { useMemo, useState } from "react";
import styles from "../pages/MoscowPlaygrounds/MoscowPlaygrounds.module.css";

const scales = {
  compact: { label: "Компактная", area: "до 300 м²", items: ["Ключевой игровой комплекс", "Качели или карусель", "Элементы для свободной игры", "Подбор покрытия и зон безопасности"] },
  district: { label: "Двор или квартал", area: "300–1 000 м²", items: ["Несколько возрастных зон", "Игровая доминанта", "Баланс, лазание и динамическая игра", "Спортивные или тихие сценарии"] },
  landmark: { label: "Знаковый объект", area: "от 1 000 м²", items: ["Индивидуальная концепция", "Уникальное оборудование", "Комплексное зонирование", "Сценарии для разных групп пользователей"] },
};

export default function MoscowLandingInteractive() {
  const [scale, setScale] = useState("district");
  const [sent, setSent] = useState(false);
  const selected = scales[scale];
  const subject = useMemo(() => encodeURIComponent("Запрос концепции детской площадки в Москве"), []);

  const submit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const body = [
      `Имя: ${form.get("name")}`,
      `Телефон или почта: ${form.get("contact")}`,
      `Тип объекта: ${form.get("objectType")}`,
      `Площадь: ${form.get("area") || "не указана"}`,
      `Бюджет: ${form.get("budget")}`,
      `Желаемый срок: ${form.get("deadline") || "не указан"}`,
      `Комментарий: ${form.get("comment") || "—"}`,
    ].join("\n");
    setSent(true);
    window.location.href = `mailto:info@ludno.ru?subject=${subject}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <section className={`${styles.section} ${styles.softSection}`} aria-labelledby="solution-title">
        <div className={styles.splitHeading}><div><p className={styles.eyebrow}>Состав решения</p><h2 id="solution-title">Что может войти в площадку</h2></div><p>Выберите масштаб, чтобы посмотреть ориентировочный состав. Это не готовая смета: точное решение формируется под участок и задачу.</p></div>
        <div className={styles.scaleTabs} role="tablist" aria-label="Масштаб площадки">
          {Object.entries(scales).map(([key, value]) => <button key={key} type="button" role="tab" aria-selected={scale === key} className={scale === key ? styles.activeTab : ""} onClick={() => setScale(key)}><span>{value.label}</span><small>{value.area}</small></button>)}
        </div>
        <div className={styles.scaleResult} role="tabpanel"><div><span className={styles.scaleArea}>{selected.area}</span><h3>{selected.label} площадка</h3></div><ul>{selected.items.map((item) => <li key={item}>{item}</li>)}</ul><a href="#brief" className={styles.secondaryButton}>Рассчитать под мой объект ↘</a></div>
      </section>

      <section className={styles.section} aria-labelledby="stages-title">
        <div className={styles.sectionHeading}><p className={styles.eyebrow}>Сроки</p><h2 id="stages-title">Этапы от задачи до реализации</h2></div>
        <div className={styles.timeline}>{[["01", "Бриф", "Получаем исходные данные и определяем формат работы."], ["02", "Концепция", "Согласуем сценарии, зонирование и предварительный состав."], ["03", "Проект", "Детализируем оборудование и необходимую документацию."], ["04", "Производство", "Изготавливаем утверждённую комплектацию."], ["05", "Поставка", "Согласуем логистику и формат сопровождения реализации."]].map(([n, name, text]) => <article key={n}><span>{n}</span><h3>{name}</h3><p>{text}</p></article>)}</div>
        <p className={styles.timelineNote}>Календарный план рассчитывается индивидуально после определения состава проекта.</p>
      </section>

      <section className={`${styles.section} ${styles.brief}`} id="brief" aria-labelledby="brief-title">
        <div className={styles.briefIntro}><p className={styles.eyebrow}>Начать проект</p><h2 id="brief-title">Получить концепцию и расчёт</h2><p>Расскажите об объекте — мы подготовим вопросы для уточнения задачи и свяжемся с вами.</p><div className={styles.directContacts}><a href="tel:+78003502420">8 800 350 24 20</a><a href="mailto:info@ludno.ru">info@ludno.ru</a></div></div>
        <form className={styles.briefForm} onSubmit={submit}>
          <label><span>Имя *</span><input name="name" autoComplete="name" required /></label>
          <label><span>Телефон или почта *</span><input name="contact" autoComplete="email" required /></label>
          <label><span>Тип объекта *</span><select name="objectType" required defaultValue=""><option value="" disabled>Выберите тип</option><option>Жилой комплекс</option><option>Парк</option><option>Школа</option><option>Детский сад</option><option>Общественное пространство</option><option>Другое</option></select></label>
          <label><span>Площадь участка, м²</span><input name="area" inputMode="numeric" /></label>
          <label><span>Бюджет</span><select name="budget" defaultValue="Нужен расчёт"><option>Нужен расчёт</option><option>Бюджет определён</option><option>Нужна оценка вариантов</option></select></label>
          <label><span>Желаемый срок</span><input name="deadline" placeholder="Например, лето 2027" /></label>
          <label className={styles.wideField}><span>Коротко о задаче</span><textarea name="comment" rows="4" /></label>
          <label className={`${styles.consent} ${styles.wideField}`}><input type="checkbox" required /><span>Я согласен с <a href="/policy/">политикой обработки персональных данных</a>.</span></label>
          <button className={styles.formSubmit} type="submit">Отправить запрос ↘</button>
          {sent && <p className={styles.formStatus} role="status">Открываем письмо с заполненным брифом. Если почтовая программа не запустилась, напишите на info@ludno.ru.</p>}
        </form>
      </section>
    </>
  );
}
