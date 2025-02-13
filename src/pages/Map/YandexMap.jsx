import React, { useEffect } from "react";
import { slugify } from "transliteration";
import styles from "./YandexMap.module.css";
import customMapStyle from "./map/customization.json";
import Breadcrumbs from "./BreadCrumbs/Breadcrumbs";

const YandexMap = () => {
  useEffect(() => {
    const loadYandexMaps = () => {
      if (document.querySelector('script[src*="api-maps.yandex.ru"]')) {
        if (window.ymaps) {
          initMap();
        }
        return;
      }

      const script = document.createElement("script");
      script.src =
        "https://api-maps.yandex.ru/2.1/?apikey=61d7ac11-9db5-4c28-b787-e60cc476c416&lang=ru_RU&mode=vector";
      script.async = true;
      script.onload = () => {
        if (window.ymaps) {
          initMap();
        }
      };
      document.body.appendChild(script);
    };

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://admin.ludno.ru/api/project-cards?populate[project][populate]=*"
        );
        if (!response.ok) {
          throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();

        return data.data.map((item) => {
          const projectName = item.project?.name || "Без названия";
          const slug = slugify(projectName, { lowercase: true, separator: "-" });

          return {
            id: item.id,
            coordinates: item.coordinates || [0, 0],
            address: item.adress || "Адрес отсутствует",
            client: item.client || "Клиент не указан",
            year: item.year || "Год не указан",
            about: item.about || "Описание отсутствует",
            title: projectName,
            type: item.project?.title || null,
            link: `/project-cards/${item.project?.id || ""}/${slug}`,
            image: item.project?.image?.[0]?.url
              ? `https://admin.ludno.ru${item.project.image[0].url}`
              : null,
          };
        });
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
        return [];
      }
    };

    const initMap = async () => {
      const mapContainer = document.getElementById("map");

      if (mapContainer.children.length > 0) return;

      if (window.ymaps) {
        window.ymaps.ready(async () => {
          const isSmallScreen = window.innerWidth <= 728;
          const map = new window.ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: isSmallScreen ? 10 : 12,
            type: "yandex#map",
            controls: [],
          });

          const points = await fetchData();

          const createPlacemark = (coords, content) => {
            const BalloonContentLayout = window.ymaps.templateLayoutFactory
              .createClass(`
                <div class="balloon-content">
                  ${
                    content.image
                      ? `<img src="${content.image}" alt="${content.title}" />`
                      : ""
                  }
                  <section>
                    <h3>${content.title}</h3>
                    <span>${content.address}</span>
                  </section>
                  <section>
                    <div>
                      <p><b>Тип:</b> ${content.type}</p>
                      <p><b>Заказчик:</b> ${content.client}</p>
                      <p><b>Год:</b> ${content.year}</p>
                    </div>
                  </section>
                  <a 
                    href="${content.link}" 
                    class="balloon-link" 
                    target="_self" 
                    rel="noopener noreferrer"
                  >
                    Перейти к проекту
                  </a>
                </div>
              `);

            return new window.ymaps.Placemark(
              coords,
              {
                hintContent: content.title,
              },
              {
                balloonContentLayout: BalloonContentLayout,
                iconLayout: "default#image",
                iconImageHref: "/assets/icons/point.svg",
                iconImageSize: [20, 20],
                iconImageOffset: [-12, -12],
                balloonCloseButton: false,
              }
            );
          };

          // Добавляем метки на карту
          points.forEach((point) => {
            if (point.coordinates) {
              const placemark = createPlacemark(point.coordinates, point);
              map.geoObjects.add(placemark);
            }
          });

          map.events.add("click", () => {
            if (map.balloon.isOpen()) {
              map.balloon.close();
            }
          });
        });
      }
    };

    loadYandexMaps();
  }, []);

  return (
    <div>
      <Breadcrumbs />
      <div className={styles.map} id="map" style={{ height: "700px" }} />
    </div>
  );
};

export default YandexMap;
