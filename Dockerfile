FROM node:21.6.2-alpine AS build

LABEL org.opencontainers.image.source=https://github.com/MichiganLabs/Hack-the-Lab-Dashboard

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine AS production

COPY --from=build /app/out /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]