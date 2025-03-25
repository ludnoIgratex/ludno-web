import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./styles/Intro.module.css";

gsap.registerPlugin(ScrollTrigger);

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const updateMatch = () => setMatches(media.matches);

    updateMatch();
    media.addEventListener("change", updateMatch);
    return () => media.removeEventListener("change", updateMatch);
  }, [query]);

  return matches;
};

const Intro = () => {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (isMobile) {
        // Анимация для мобильных
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
      } else {
        // Анимация для десктопа
        gsap.set(itemsRef.current, { yPercent: 80, opacity: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=3000",
            scrub: true,
            pin: true,
          },
        });

        tl.to(itemsRef.current[0], { yPercent: 0, duration: 1 }, "start")
          .to(itemsRef.current[0], { opacity: 0, duration: 0.5 }, "start+=0.4");

        tl.to(itemsRef.current[1], { yPercent: 0, duration: 1 }, "start+=0.5")
          .to(itemsRef.current[1], { opacity: 0, duration: 0.5 }, "start+=1");

        tl.to(itemsRef.current[2], { yPercent: 0, duration: 1 }, "start+=1")
          .to(itemsRef.current[2], { opacity: 0, duration: 0.5 }, "start+=1.8");

        tl.to(itemsRef.current[3], { yPercent: 0, duration: 1 }, "start+=1.5")
          .to(itemsRef.current[3], { opacity: 0, duration: 0.5 }, "start+=2.3");
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  const desktopOrder = [
    {
      src: "/assets/images/mini-solution/blue.svg",
      alt: "Blue",
      textClass: styles.overlayTextLast,
    },
    {
      src: "/assets/images/mini-solution/orange.svg",
      alt: "Orange",
      textClass: styles.overlayText,
    },
    {
      src: "/assets/images/mini-solution/green.svg",
      alt: "Green",
      textClass: styles.overlayText,
    },
    {
      src: "/assets/images/mini-solution/pink.svg",
      alt: "Pink",
      textClass: styles.overlayText,
    },
  ];

  const mobileOrder = [
    {
      src: "/assets/images/mini-solution/orange.svg",
      alt: "Orange",
      textClass: styles.overlayText,
    },
    {
      src: "/assets/images/mini-solution/green.svg",
      alt: "Green",
      textClass: styles.overlayText,
    },
    {
      src: "/assets/images/mini-solution/pink.svg",
      alt: "Pink",
      textClass: styles.overlayText,
    },
    {
      src: "/assets/images/mini-solution/blue.svg",
      alt: "Blue",
      textClass: styles.overlayTextLast,
    },
  ];

  const blocksToRender = isMobile ? mobileOrder : desktopOrder;

  return (
    <div className={styles.introContainer} ref={containerRef}>
      <div className={styles.imageWrapper}>
        {blocksToRender.map((block, index) => (
          <div
            className={styles.overlayItem}
            ref={(el) => (itemsRef.current[index] = el)}
            key={block.alt}
          >
            <img
              src={block.src}
              alt={block.alt}
              className={styles.overlayImage}
            />
            <div className={block.textClass}>
              Разработано для развития и комфорта ребенка
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Intro;
