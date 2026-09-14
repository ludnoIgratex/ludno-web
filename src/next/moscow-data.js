import { cache } from "react";
import { moscowProjectStories, prepareMoscowProjects } from "../data/moscowPlaygrounds";
import { getProjectCard } from "./project-data";

export const getMoscowProjects = cache(async () => {
  const cards = await Promise.all(moscowProjectStories.map(({ id }) => getProjectCard(id)));
  return prepareMoscowProjects(cards, process.env.STRAPI_URL || "https://admin.ludno.ru");
});
