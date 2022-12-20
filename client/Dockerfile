FROM node:14-alpine AS builder

ARG API_URL

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

COPY --from=builder app/dist .

COPY .nginx/nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]