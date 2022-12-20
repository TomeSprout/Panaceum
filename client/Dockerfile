FROM node:14-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

RUN npm build

COPY . .

RUN ls /app

RUN ls /app/dist

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

RUN ls /usr/share/nginx/html

COPY --from=builder ./app/dist/ .

RUN ls .

COPY .nginx/nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]