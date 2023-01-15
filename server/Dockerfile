FROM node:14-alpine AS builder

WORKDIR /app/panaceum-server

COPY package*.json ./
COPY . .
RUN npm ci
RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/node/app

# Remove default nginx static assets
RUN rm -rf ./*

COPY --from=builder ./app/panaceum-server/dist/ .

ENTRYPOINT ["nginx", "-g", "daemon off;"]