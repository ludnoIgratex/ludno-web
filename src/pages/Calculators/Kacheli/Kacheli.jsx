import React, { useMemo, useState } from "react";
import styles from "./Kacheli.module.css";

// Границы высоты для всех типов подвеса (мм)
const MIN_HEIGHT = 1500;
const MAX_HEIGHT = 3500;

// Типы подвеса (мм, кг)
const SEAT_TYPES = {
  odinochnoe: {
    label: "Одиночное",
    width: 450,
    thickness: 45,
    seatMass: 1.6,
    chainMass: 5,
    img: "/assets/images/calculator/odinochnoe.jpg",
    kind: "basic",
  },
  lulka: {
    label: "Люлька",
    width: 450,
    thickness: 45,
    seatMass: 6,
    chainMass: 5,
    img: "/assets/images/calculator/lulka.jpg",
    kind: "basic",
  },
  gibkoe: {
    label: "Гибкое",
    width: 450,
    thickness: 280,
    seatMass: 1.6,
    chainMass: 5,
    img: "/assets/images/calculator/gibkoe.jpg",
    kind: "basic",
  },
  gnezdo1000: {
    label: "Гнездо Ø1000",
    width: 1050,
    thickness: 115,
    seatMass: 25,
    chainMass: 5,
    img: "/assets/images/calculator/gnezdo.jpg",
    kind: "nest",
  },
  gnezdo1200: {
    label: "Гнездо Ø1200",
    width: 1255,
    thickness: 115,
    seatMass: 30,
    chainMass: 5,
    img: "/assets/images/calculator/gnezdo.jpg",
    kind: "nest",
  },
};

const r = (n) => (Number.isFinite(n) ? Math.round(n) : "–");
const canComputeNestClearance = (H, width) => H >= 400 + width / 2;

export default function Kacheli() {
  // ДРАФТ (то, что вводит пользователь)
  const [draftHeight, setDraftHeight] = useState("2500");
  const [draftSeatType, setDraftSeatType] = useState("odinochnoe");

  // ЗАКОММИЧЕНО (то, что реально считается и показывается справа)
  const [heightCommitted, setHeightCommitted] = useState(2500);
  const [seatTypeCommitted, setSeatTypeCommitted] = useState("odinochnoe");

  // Управление показом результатов и “подсчётом”
  const [submitted, setSubmitted] = useState(true);
  const [loading, setLoading] = useState(false);

  const heightNumDraft = useMemo(() => {
    const n = Number(String(draftHeight).replace(",", "."));
    return Number.isFinite(n) ? n : NaN;
  }, [draftHeight]);

  const cfg = SEAT_TYPES[seatTypeCommitted];

  const result = useMemo(() => {
    const H = heightCommitted;
    if (!Number.isFinite(H) || H <= 0) return null;

    // Общее ограничение для всех типов подвеса
    if (H < MIN_HEIGHT || H > MAX_HEIGHT) return null;

    const W = cfg.width;
    const T = cfg.thickness;

    let clearance;
    if (cfg.kind === "basic") {
      clearance = 350;
    } else {
      // Для «гнезда» техническая проверка сохраняется,
      // но при H >= 1500 она всегда выполняется
      if (!canComputeNestClearance(H, W)) return null;
      const a = (H - 400) ** 2 - (W / 2) ** 2;
      clearance = H - Math.sqrt(Math.max(0, a));
    }

    const L = H - clearance - T; // длина подвеса
    const zoneWidth = W <= 500 ? 1750 : W + 1250; // ширина зоны
    const zoneLength = (0.867 * L + 2250) * 2; // длина зоны
    const distToSupport = cfg.kind === "basic" ? 0.2 * L + 200 : 0.2 * L + 400;
    const freeFallHeight = L / 2 + (H - L);
    const distBetweenSeats = cfg.kind === "basic" ? 0.2 * L + 300 : 0;

    return {
      clearance,
      zoneWidth,
      zoneLength,
      distToSupport,
      freeFallHeight,
      distBetweenSeats,
    };
  }, [heightCommitted, seatTypeCommitted, cfg]);

  const onSubmit = (e) => {
    e.preventDefault();
    // имитируем расчёт
    setLoading(true);
    setSubmitted(true);
    setTimeout(() => {
      if (Number.isFinite(heightNumDraft) && heightNumDraft > 0) {
        // Коммитим введённое значение всегда, чтобы справа либо посчиталось, либо показалась ошибка
        setHeightCommitted(heightNumDraft);
        setSeatTypeCommitted(draftSeatType);
      }
      setLoading(false);
    }, 500); // ощущение “подсчёта”
  };

  // Текст ошибки под общее правило
  const errorText = `Введите корректную высоту. Допустимый диапазон: ${MIN_HEIGHT}–${MAX_HEIGHT} мм.`;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Калькулятор зоны приземления качелей</h1>
      <p className={styles.lead}>
        OmniRoom is truly modular. You can arrange individual Rooms or combine
        them into cross-functional hubs to build the perfect, flexible office
        around them. Configuration sized at 8430 × 3170 × 2400 mm provides space
        and complexity.
      </p>

      <div className={styles.canvas}>
        {/* Левая карточка */}
        <form onSubmit={onSubmit} className={`${styles.card} ${styles.left}`}>
          <div className={styles.field}>
            <label htmlFor="height" className={styles.label}>
              Высота крепления качелей, мм <span className={styles.dot} />
            </label>
            <input
              id="height"
              className={styles.input}
              inputMode="numeric"
              pattern="[0-9]*"
              value={draftHeight}
              onChange={(e) => setDraftHeight(e.target.value)}
            />
            {/* <div className={styles.hint}>
              Допустимый диапазон: {MIN_HEIGHT}–{MAX_HEIGHT} мм
            </div> */}
          </div>

          <div className={styles.field}>
            <div className={styles.label}>Тип подвеса</div>
            <div className={styles.cards}>
              {Object.entries(SEAT_TYPES).map(([key, t]) => (
                <label
                  key={key}
                  className={`${styles.seatCard} ${
                    draftSeatType === key ? styles.seatCardActive : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="seatType"
                    value={key}
                    checked={draftSeatType === key}
                    onChange={() => setDraftSeatType(key)}
                  />
                  <div className={styles.seatImageWrap}>
                    <img
                      src={t.img}
                      alt={t.label}
                      className={styles.seatImage}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.seatTitle}>{t.label}</div>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.submit}>
              {loading ? "Считаем…" : "Рассчитать"}
            </button>
          </div>
        </form>

        {/* Правая карточка */}
        <section className={`${styles.card} ${styles.right}`}>
          <h2 className={styles.cardTitle}>Покрытие</h2>

          {!submitted ? null : loading ? (
            <div className={styles.calcLoader}>Выполняется расчёт…</div>
          ) : result ? (
            <div className={styles.resultGrid}>
              <ul className={styles.resultList}>
                <li className={styles.resultRow}>
                  <span>Ширина зоны приземления, мм</span>
                  <strong>{r(result.zoneWidth)} мм</strong>
                </li>
                <li className={styles.resultRow}>
                  <span>Длина зоны приземления, мм</span>
                  <strong>{r(result.zoneLength)} мм</strong>
                </li>
                <li className={`${styles.resultRow} ${styles.withDot}`}>
                  <span>Высота свободного падения, мм</span>
                  <strong>{r(result.freeFallHeight)} мм</strong>
                </li>
              </ul>
              <ul className={styles.resultList}>
                <li className={`${styles.resultRow}`}>
                  <span>Расстояние до стойки</span>
                  <strong>{r(result.distToSupport)} мм</strong>
                </li>
                <li className={`${styles.resultRow} ${styles.multilineLabel}`}>
                  <span>Расстояние до соседнего подвеса</span>
                  <strong>{r(result.distBetweenSeats)} мм</strong>
                </li>
                <li className={styles.resultRow}>
                  <span>Клиренс</span>
                  <strong>{r(result.clearance)} мм</strong>
                </li>
              </ul>
            </div>
          ) : (
            <div className={styles.error}>{errorText}</div>
          )}

          <p className={styles.cardFoot}>
            OmniRoom is truly modular. You can arrange individual Rooms or
            combine them into cross-functional
          </p>

          <div className={styles.links}>
            <span className={styles.dots}>…</span>
            <a href="/contacts" className={styles.link}>
              Узнать цену
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
