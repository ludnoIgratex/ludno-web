import React, { useMemo, useState, useEffect } from "react";
import styles from "./Kacheli.module.css";
import InfoTooltip from "../../../components/InfoTooltip/InfoTooltip";
import qs from "qs";

const MIN_HEIGHT = 1500;
const MAX_HEIGHT = 3500;

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
  const [draftHeight, setDraftHeight] = useState("2500");
  const [draftSeatType, setDraftSeatType] = useState("odinochnoe");

  const [heightCommitted, setHeightCommitted] = useState(2500);
  const [seatTypeCommitted, setSeatTypeCommitted] = useState("odinochnoe");

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

    if (H < MIN_HEIGHT || H > MAX_HEIGHT) return null;

    const W = cfg.width;
    const T = cfg.thickness;

    let clearance;
    if (cfg.kind === "basic") {
      clearance = 350;
    } else {
      if (!canComputeNestClearance(H, W)) return null;
      const a = (H - 400) ** 2 - (W / 2) ** 2;
      clearance = H - Math.sqrt(Math.max(0, a));
    }

    const L = H - clearance - T;
    const zoneWidth = W <= 500 ? 1750 : W + 1250;
    const zoneLength = (0.867 * L + 2250) * 2;
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
    setLoading(true);
    setSubmitted(true);
    setTimeout(() => {
      if (Number.isFinite(heightNumDraft) && heightNumDraft > 0) {
        setHeightCommitted(heightNumDraft);
        setSeatTypeCommitted(draftSeatType);
      }
      setLoading(false);
    }, 500);
  };

  const errorText = `Введите корректную высоту. Допустимый диапазон: ${MIN_HEIGHT}–${MAX_HEIGHT} мм.`;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Калькулятор зоны приземления качелей</h1>
      <p className={styles.lead}>
        Калькулятор зоны приземления качелей помогает определить размеры зоны
        приземления в соответствии с ГОСТ. Полезен при проектировании качелей,
        установленных на перголах или нестандартных конструкциях.
      </p>

      <div className={styles.canvas}>
        <form onSubmit={onSubmit} className={`${styles.card} ${styles.left}`}>
          <div className={styles.field}>
            <label htmlFor="height" className={styles.label}>
              Высота крепления качелей, мм <span className={styles.dot} />
              <InfoTooltip
                text={
                  "Расстояние между поверхностью игровой площадки и осью вращения подвеса качелей / нижней поверхностью несущей перекладины"
                }
              />
            </label>
            <input
              id="height"
              className={styles.input}
              inputMode="numeric"
              pattern="[0-9]*"
              value={draftHeight}
              onChange={(e) => setDraftHeight(e.target.value)}
            />
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

        <section className={`${styles.card} ${styles.right}`}>
          <h2 className={styles.cardTitle}>Расчет зоны качелей</h2>

          {/* 1. Ещё не отправляли форму */}
          {!submitted && null}

          {/* 2. Считаем */}
          {submitted && loading && (
            <div className={styles.calcLoader}>Выполняется расчёт…</div>
          )}

          {/* 3. Есть результат */}
          {submitted && !loading && result && (
            <>
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
                    <span>
                      Высота свободного падения, мм
                      <InfoTooltip
                        text={
                          "Расстояние от середины поверхности сиденья качелей до поверхности игровой площадки в момент, когда сиденье отклонено от исходного положения на угол 60 градусов"
                        }
                      />
                    </span>
                    <strong>{r(result.freeFallHeight)} мм</strong>
                  </li>
                </ul>

                <ul className={styles.resultList}>
                  <li className={styles.resultRow}>
                    <span>
                      Расстояние до стойки
                      <InfoTooltip
                        text={
                          "Расстояние между опорной стойкой и боковой поверхностью сиденья качелей"
                        }
                      />
                    </span>
                    <strong>{r(result.distToSupport)} мм</strong>
                  </li>

                  <li
                    className={`${styles.resultRow} ${styles.multilineLabel}`}
                  >
                    <span>
                      Расстояние до соседнего подвеса
                      <InfoTooltip
                        text={
                          "Расстояние между боковыми поверхностями двух сидений качелей. Используется только люльки, одиночного и гибкого сидений."
                        }
                      />
                    </span>
                    <strong>{r(result.distBetweenSeats)} мм</strong>
                  </li>

                  <li className={styles.resultRow}>
                    <span>
                      Клиренс
                      <InfoTooltip
                        text={
                          "Расстояние между нижней поверхностью сиденья качелей и поверхностью игровой площадки"
                        }
                      />
                    </span>
                    <strong>{r(result.clearance)} мм</strong>
                  </li>
                </ul>
              </div>

              <div className={styles.links}>
                <span className={styles.dots}>…</span>
                <a href="/contacts" className={styles.link}>
                  Узнать цену
                </a>
              </div>
            </>
          )}

          {/* 4. Ошибка */}
          {submitted && !loading && !result && (
            <div className={styles.error}>{errorText}</div>
          )}
        </section>
      </div>
    </div>
  );
}
