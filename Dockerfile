FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG BUILD_CACHE_BUSTER
ENV BUILD_CACHE_BUSTER=$BUILD_CACHE_BUSTER

RUN node --test src/next/cms-link-renderer.test.js
RUN npm run build

FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=80

COPY --from=build /app/dist ./dist
COPY --from=build /app/.cache/sitemap-lastmod.json ./.cache/sitemap-lastmod.json
COPY --from=build /app/.cache/cms-route-history.json ./.cache/cms-route-history.json
COPY package.json server.mjs ./
COPY src/server ./src/server
COPY src/data/legacyContentRoutes.js ./src/data/legacyContentRoutes.js

EXPOSE 80

CMD ["node", "server.mjs"]
