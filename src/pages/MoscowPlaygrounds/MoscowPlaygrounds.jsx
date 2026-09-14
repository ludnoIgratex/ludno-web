import React, { useEffect, useState } from "react";
import MoscowPlaygroundsContent from "./MoscowPlaygroundsContent";
import { prepareMoscowProjects } from "../../data/moscowPlaygrounds";

export default function MoscowPlaygrounds() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({
      "populate[mainImage]": "true",
      "populate[project]": "true",
      "pagination[pageSize]": "100",
    });
    fetch(`https://admin.ludno.ru/api/project-cards?${params}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Projects: ${response.status}`);
        return response.json();
      })
      .then((data) => setProjects(prepareMoscowProjects(data.data || [])))
      .catch((cause) => { if (cause.name !== "AbortError") setError(true); });
    return () => controller.abort();
  }, []);
  return <>
    {error && <p role="status">Не удалось загрузить фотографии. <a href="/projects/">Посмотреть проекты</a></p>}
    <MoscowPlaygroundsContent projects={projects} />
  </>;
}
