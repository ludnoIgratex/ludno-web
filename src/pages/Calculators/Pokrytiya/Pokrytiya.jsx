import React, { useMemo, useState, useEffect, useRef } from "react";
import styles from "./Pokrytiya.module.css";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import InfoTooltip from "../../../components/InfoTooltip/InfoTooltip";
import Materials from "./Materials/Materials";
import qs from "qs";


function Dropdown({ value, options, onChange, width = 200, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setIsOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setIsOpen(false);
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const shown = options || [];
  const rest = shown.filter((o) => o !== value);

  

  return (
    <div className={styles.field}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.dropdownContainer} style={{ width }} ref={ref}>
        <div
          className={styles.dropdownHeader}
          onClick={() => setIsOpen((p) => !p)}
        >
          <div className={styles.currentDimension}>{value}</div>
          <div className={styles.arrowContainer}>
            {isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </div>
        </div>

        {isOpen && (
          <ul className={styles.dropdownList}>
            {rest.map((opt) => (
              <li
                key={opt}
                className={styles.groupItem}
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
              >
                {opt}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const DB = {
  "Синтетическое (epdm, sbr)": {
    "Без принудительного движения": {
      "< 600 мм": 0,
      "600–1300 мм": 40,
      "1301–1600 мм": 50,
      "1601–1700 мм": 60,
      "1701–1900 мм": 70,
      "1901–2100 мм": 80,
      "2101–2300 мм": 90,
      "2301–2400 мм": 100,
      "2401–2600 мм": 110,
      "2601–2800 мм": 120,
      "2801–3000 мм": 130,
    },
    "С принудительным движением": {
      "< 600 мм": 20,
      "600–1300 мм": 40,
      "1301–1600 мм": 50,
      "1601–1700 мм": 60,
      "1701–1900 мм": 70,
      "1901–2100 мм": 80,
      "2101–2300 мм": 90,
      "2301–2400 мм": 100,
      "2401–2600 мм": 110,
      "2601–2800 мм": 120,
      "2801–3000 мм": 130,
    },
  },
  Песок: {
    "Без принудительного движения": {
      "< 600 мм": 0,
      "600–2000 мм": 300,
      "2001–3000 мм": 400,
    },
    "С принудительным движением": {
      "< 600 мм": 300,
      "600–2000 мм": 300,
      "2001–3000 мм": 400,
    },
  },
  Галька: {
    "Без принудительного движения": {
      "< 600 мм": 0,
      "600–2000 мм": 300,
      "2001–3000 мм": 400,
    },
    "С принудительным движением": {
      "< 600 мм": 300,
      "600–2000 мм": 300,
      "2001–3000 мм": 400,
    },
  },
  "Щепа, кора": {
    "Без принудительного движения": {
      "< 600 мм": 0,
      "600–2000 мм": 300,
      "2001–3000 мм": 400,
    },
    "С принудительным движением": {
      "< 600 мм": 300,
      "600–2000 мм": 300,
      "2001–3000 мм": 400,
    },
  },
};

const TYPES = Object.keys(DB);

export default function Pokrytiya() {
  // черновик выбора
  const [draftType, setDraftType] = useState(TYPES[0]);
  const [draftEquip, setDraftEquip] = useState(Object.keys(DB[TYPES[0]])[0]);
  const [draftHeightBand, setDraftHeightBand] = useState(
    Object.keys(DB[TYPES[0]][Object.keys(DB[TYPES[0]])[0]])[0]
  );

  // зафиксированное после "Рассчитать"
  const [committed, setCommitted] = useState({
    type: TYPES[0],
    equip: Object.keys(DB[TYPES[0]])[0],
    heightBand: Object.keys(DB[TYPES[0]][Object.keys(DB[TYPES[0]])[0]])[0],
  });
  const [submitted, setSubmitted] = useState(true);
  const [loading, setLoading] = useState(false);

  // зависимые списки
  const equipOptions = useMemo(() => Object.keys(DB[draftType]), [draftType]);
  const heightBandOptions = useMemo(
    () => Object.keys(DB[draftType][draftEquip] || {}),
    [draftType, draftEquip]
  );

  const [materials, setMaterials] = useState([]);
  const [selectedMaterialIndex, setSelectedMaterialIndex] = useState(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const query = qs.stringify(
          {
            populate: {
              image: {
                fields: ["url", "alternativeText", "formats"],
              },
            },
            pagination: {
              limit: 100,
            },
          },
          { encodeValuesOnly: true }
        );

        const res = await fetch(
          `https://admin.ludno.ru/api/materials?${query}`
        );
        const json = await res.json();

        const items =
          json?.data?.map((item) => {
            const img = item.image || item.image?.data;

            return {
              id: item.id,
              name: item.name,
              description: item.description,
              image: img
                ? {
                    url: img.url,
                    formats: img.formats || {},
                    alternativeText: img.alternativeText,
                  }
                : null,
            };
          }) || [];

        setMaterials(items);
      } catch (e) {
        console.error("Failed to load materials", e);
        setMaterials([]);
      }
    };

    fetchMaterials();
  }, []);

  // держим валидные значения при смене родителя
  useEffect(() => {
    if (!equipOptions.includes(draftEquip)) {
      const e = equipOptions[0];
      setDraftEquip(e);
      setDraftHeightBand(Object.keys(DB[draftType][e])[0]);
    }
    // eslint-disable-next-line
  }, [draftType]);

  useEffect(() => {
    if (!heightBandOptions.includes(draftHeightBand)) {
      setDraftHeightBand(heightBandOptions[0]);
    }
    // eslint-disable-next-line
  }, [draftType, draftEquip]);

  const thickness = useMemo(() => {
    const { type, equip, heightBand } = committed;
    return DB[type][equip][heightBand];
  }, [committed]);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(true);
    setTimeout(() => {
      setCommitted({
        type: draftType,
        equip: draftEquip,
        heightBand: draftHeightBand,
      });
      setLoading(false);
    }, 300);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Калькулятор толщины покрытий</h1>
      <p className={styles.lead}>
        OmniRoom is truly modular. You can arrange individual Rooms or combine
        them into cross-functional hubs to build the perfect, flexible office
        around them. Configuration sized at 8430 × 3170 × 2400 mm provides space
        and complexity.
      </p>

      <section className={styles.canvas}>
        {/* левая карточка */}
        <form className={`${styles.card} ${styles.left}`} onSubmit={onSubmit}>
          <div className={styles.optionsList}>
            <Dropdown
              label={
                <>
                  Высота падения
                  <InfoTooltip
                    text={
                      "Максимальная высота свободного падения определяется производителем для каждого отдельного оборудования."
                    }
                  />
                </>
              }
              value={draftHeightBand}
              options={heightBandOptions}
              onChange={setDraftHeightBand}
              width={260}
            />
            <Dropdown
              label="Тип покрытия"
              value={draftType}
              options={TYPES}
              onChange={setDraftType}
              width={260}
            />
            <Dropdown
              label={
                <>
                  Тип оборудования
                  <InfoTooltip
                    text={
                      "К принудительному типу движения относится оборудование, которое приводится в движение за счет механики устройства. Например: качели, горки, канатные дороги, карусели, качалки и балансиры."
                    }
                  />
                </>
              }
              value={draftEquip}
              options={equipOptions}
              onChange={setDraftEquip}
              width={260}
            />
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.submit}>
              {loading ? "Считаем…" : "Рассчитать"}
            </button>
          </div>
        </form>

        {/* правая карточка */}
        <div className={`${styles.card} ${styles.right}`}>
          <h2 className={styles.cardTitle}>Покрытие</h2>

          {!submitted ? null : loading ? (
            <div className={styles.calcLoader}>Выполняется расчёт…</div>
          ) : (
            <>
              <strong>{thickness} мм</strong>

              <p className={styles.cardFoot}>
                Ударопоглощающее покрытие с указанной толщиной необходимо
                размещать по всей зоне приземления. Размер зоны приземления
                определяется производителем оборудования.
              </p>

              <div className={styles.links}>
                <a href="/contacts" className={styles.link}>
                  Узнать цену
                </a>
              </div>
            </>
          )}
        </div>
      </section>

      <div>
        <Materials
          materials={materials}
          selectedMaterialIndex={selectedMaterialIndex}
          setSelectedMaterialIndex={setSelectedMaterialIndex}
        />
      </div>
    </div>
  );
}
