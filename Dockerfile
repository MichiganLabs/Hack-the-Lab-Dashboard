FROM node:21.6.2-alpine AS build

LABEL org.opencontainers.image.source=https://github.com/MichiganLabs/Hack-the-Lab-Dashboard

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:21.6.2-alpine AS production

WORKDIR /app

COPY package*.json .

RUN npm ci --omit=dev --ignore-scripts

COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

CMD ["npm", "run", "start"]