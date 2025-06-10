import React, { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import styles from "./styles/RouteStructure.module.css";

const points = [
  {
    id: "vkhod",
    label: "Входные точки",
    text: "крупные навигационные стелы с общей схемой территории, правилами поведения, знаками безопасности и основной информацией.",
    icon: "/assets/images/nature-navigation/vkhodnye-tochki.avif",
    position: { top: "24%", left: "0%" },
  },
  {
    id: "razvilki",
    label: "Развилки, направления",
    text: "оформляются указателями, которые обеспечивают чёткое и однозначное понимание, куда двигаться дальше. Помогает оценить усилия и планировать маршрут.",
    icon: "/assets/images/nature-navigation/razvylky-napravleniya.avif",
    position: { top: "45%", left: "20%" },
  },
  {
    id: "metki",
    label: "Маршрутные метки",
    text: "небольшие столбики или таблички, размещённые через регулярные интервалы и подтверждающие, что человек движется в правильном направлении. Важны на длинных участках без видимых ориентиров.",
    icon: "/assets/images/nature-navigation/marshrutnye-metki.avif",
    position: { top: "20%", left: "42%" },
  },
  {
    id: "otdyh",
    label: "Точки отдыха",
    text: "оборудуются скамейками, столами и навесами, которые выполнены в том же визуальном стиле, что и навигационные элементы. Это создаёт целостное и узнаваемое пространство.",
    icon: "/assets/images/nature-navigation/tochka-otdykha.avif",
    position: { top: "65%", left: "42%" },
  },
  {
    id: "kluchevye",
    label: "Ключевые точки маршрута",
    text: "информационные щиты, рассказывающие о природных, исторических или культурных особенностях локации – описание редких растений. Способствуют вовлечению посетителя в контекст ландшафта.",
    icon: "/assets/images/nature-navigation/kluchevye-tochki-marshruta.avif",
    position: { top: "63%", left: "74%" },
  },
];

const RouteStructure = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [activePoints, setActivePoints] = useState(isMobile ? [points[0].id] : []);
  const mapWrapperRef = useRef(null);

  const handleClick = (id) => {
    if (isMobile) {
      setActivePoints([id]);
    } else {
      setActivePoints(prev => {
        if (prev.includes(id)) {
          return prev.filter(pointId => pointId !== id);
        }
        return [...prev, id];
      });
    }
  };

  const handleClose = (id) => {
    if (!isMobile) {
      setActivePoints(prev => prev.filter(pointId => pointId !== id));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!isMobile && mapWrapperRef.current && !mapWrapperRef.current.contains(event.target)) {
        setActivePoints([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      setActivePoints([points[0].id]);
    }
  }, [isMobile]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>
        <h2 className={styles.title}>Структура маршрута</h2>
        <p className={styles.description}>
          Наша линейка охватывает все этапы маршрута — от входных групп до
          ключевых точек и промежуточных ориентиров. Такая система особенно
          эффективна <br />
          на ООПТ, в природных парках, на экотропах и в туристических зонах.
        </p>
      </div>

      <div className={styles.mapWrapper} ref={mapWrapperRef}>
        <img
          className={styles.map}
          src="/assets/images/nature-navigation/Road-Structure.avif"
          alt="Структура маршрута"
        />

        {points.map((point) => (
          <div
            key={point.id}
            className={styles.point}
            style={point.position}
            onClick={() => handleClick(point.id)}
          >
            {!(activePoints.includes(point.id) && !isMobile) && (
              <img
                src={point.icon}
                alt={point.label}
                className={
                  isMobile && activePoints.includes(point.id)
                    ? styles.mobileActiveImage
                    : ""
                }
              />
            )}

            {!isMobile && activePoints.includes(point.id) && (
              <div className={styles.card}>
                <button className={styles.close} onClick={(e) => {
                  e.stopPropagation();
                  handleClose(point.id);
                }}>
                  ✕
                </button>
                <strong>{point.label}</strong>
                <p>{point.text}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {isMobile && activePoints.length > 0 && (
        <div className={styles.mobileCard}>
          <strong>{points.find(p => p.id === activePoints[0]).label}</strong>
          <p>{points.find(p => p.id === activePoints[0]).text}</p>
        </div>
      )}
    </div>
  );
};

export default RouteStructure;
