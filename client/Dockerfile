FROM node:14-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY . .
RUN npm ci
RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

COPY --from=builder ./app/dist/ .
COPY .nginx/nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]