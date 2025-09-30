import React, { useEffect, useMemo, useRef, useState } from "react";
import s from "./AppleDotSlider.module.css";

export default function AppleDotSlider({
  images = [],
  interval = 5000,
  autoplay = true,
  loop = true,
  pauseOnHover = true,
}) {
  const count = images.length;
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const timerRef = useRef(null);

  const goTo = (i) => {
    if (!count) return;
    const next = loop ? (i + count) % count : Math.min(Math.max(i, 0), count - 1);
    setIndex(next);
  };
  const next = () => goTo(index + 1);

  // автопрокрутка
  useEffect(() => {
    if (!isPlaying || count <= 1) return;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(next, interval);
    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, index, interval, count]);

  // пауза по ховеру
  const onEnter = () => pauseOnHover && setIsPlaying(false);
  const onLeave = () => pauseOnHover && setIsPlaying(true);

  // для анимации (если изменишь interval — сразу подтянется)
  const pillVars = useMemo(() => ({ "--dur": `${Math.min(interval, 800)}ms` }), [interval]);

  return (
    <div className={s.gallery} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <div className={s.viewport}>
        {images.map((src, i) => (
          <div
            key={i}
            className={`${s.slide} ${i === index ? s.active : ""}`}
            aria-hidden={i === index ? "false" : "true"}
          >
            <img className={s.media} src={src} alt={`Slide ${i + 1}`} />
          </div>
        ))}
      </div>

      {/* точки поверх изображения */}
      <div className={s.dotnavWrap} aria-label="Навигация по слайдам" style={pillVars}>
        <div className={s.dotnav} role="tablist">
          {Array.from({ length: count }).map((_, i) => {
            const active = i === index;
            return (
              <button
                key={i}
                className={`${s.dot} ${active ? s.dotActive : ""}`}
                role="tab"
                aria-selected={active}
                aria-label={`К слайду ${i + 1}`}
                onClick={() => goTo(i)}
              />
            );
          })}
        </div>
        <button
          className={s.playpause}
          aria-label={isPlaying ? "Пауза" : "Играть"}
          onClick={() => setIsPlaying((p) => !p)}
        >
          <span className={`${s.icon} ${isPlaying ? s.pause : s.play}`} />
        </button>
      </div>
    </div>
  );
}
