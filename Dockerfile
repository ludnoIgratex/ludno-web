FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG BUILD_CACHE_BUSTER
ENV BUILD_CACHE_BUSTER=$BUILD_CACHE_BUSTER

RUN npm run build

FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=80

COPY --from=build /app/dist ./dist
COPY --from=build /app/.cache/sitemap-lastmod.json ./.cache/sitemap-lastmod.json
COPY server.mjs ./

EXPOSE 80

CMD ["node", "server.mjs"]
