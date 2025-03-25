import React, { useEffect, useRef } from "react";
import styles from "./styles/Slider.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Slider = () => {
  const containerRef = useRef(null);
  const kineticaRef = useRef(null);
  const motoricaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2000",
          scrub: true,
          pin: true,
        },
      });

      tl.to(kineticaRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power1.out",
      }).fromTo(
        motoricaRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1, ease: "power1.out" },
        "<"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles.sliderWrapper}>
      <div ref={kineticaRef} className={`${styles.section} ${styles.kinetica}`}>
        <h2>Кинетика</h2>
        <div className={styles.content}>
          <p>
            Кинетика — это наука, изучающая движение и силы, которые его
            вызывают. В игровом пространстве кинетика проявляется через активное
            взаимодействие ребёнка с элементами площадки: балансировку, прыжки,
            раскачивание и изменение траекторий движения. <br />
            <span className={styles.brSpace}></span>
            Динамическое оборудование стимулирует естественную потребность в
            движении, помогая детям лучше чувствовать своё тело и окружающую
            среду.
          </p>
          <img src="/assets/images/kinetics-solution/kinetica.webp" alt="" />
        </div>
      </div>

      <div ref={motoricaRef} className={`${styles.section} ${styles.motorica}`}>
        <h2>Моторика</h2>
        <div className={styles.content}>
          <p>
            Моторика — это система движений, отвечающая за координацию,
            равновесие и точность движений. Она делится на крупную (ходьба,
            прыжки, лазание) и мелкую (мелкие движения рук и пальцев), обе из
            которых важны для гармоничного развития ребёнка. <br />
            <span className={styles.brSpace}></span>
            Игровые элементы, такие как балансировочные кочки, батуты,
            геопластика, формируют навык управления телом, укрепляют мышцы и
            развивают пространственное мышление.
          </p>
          <img src="/assets/images/kinetics-solution/motorica.webp" alt="" />
        </div>
      </div>
    </section>
  );
};

export default Slider;
