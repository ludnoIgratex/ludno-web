import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./styles/Intro.module.css";

gsap.registerPlugin(ScrollTrigger);

const Intro = () => {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set(itemsRef.current, { yPercent: 80, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3000",
          scrub: true,
          pin: true,
        },
      });

      tl.to(itemsRef.current[0], { yPercent: 0, opacity: 1 }, 0)
        .to(itemsRef.current[1], { yPercent: 20, opacity: 1 }, 0.25)
        .to(itemsRef.current[2], { yPercent: 40, opacity: 1 }, 0.75)
        .to(itemsRef.current[3], { yPercent: 140, opacity: 1 }, 1);
    }, containerRef);

    return () => ctx.revert();

  }, []);

  return (
    <div className={styles.introContainer} ref={containerRef}>
      <div className={styles.imageWrapper}>
        {/* Оранжевый блок */}
        <div
          className={styles.overlayItem}
          ref={(el) => (itemsRef.current[0] = el)}
        >
          <img
            src="/assets/images/mini-solution/orange.svg"
            alt="Orange"
            className={styles.overlayImage}
          />
          <div className={styles.overlayText}>
            Разработано для развития и комфорта ребенка
          </div>
        </div>

        {/* Зеленый блок */}
        <div
          className={styles.overlayItem}
          ref={(el) => (itemsRef.current[1] = el)}
        >
          <img
            src="/assets/images/mini-solution/green.svg"
            alt="Green"
            className={styles.overlayImage}
          />
          <div className={styles.overlayText}>
            Разработано для развития и комфорта ребенка
          </div>
        </div>

        {/* Розовый блок */}
        <div
          className={styles.overlayItem}
          ref={(el) => (itemsRef.current[2] = el)}
        >
          <img
            src="/assets/images/mini-solution/pink.svg"
            alt="Pink"
            className={styles.overlayImage}
          />
          <div className={styles.overlayText}>
            Разработано для развития и комфорта ребенка
          </div>
        </div>

        {/* Синий блок */}
        <div
          className={styles.overlayItem}
          ref={(el) => (itemsRef.current[3] = el)}
        >
          <img
            src="/assets/images/mini-solution/blue.svg"
            alt="Blue"
            className={styles.overlayImage}
          />
          <div className={styles.overlayTextLast}>
            Разработано для развития и комфорта ребенка
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
