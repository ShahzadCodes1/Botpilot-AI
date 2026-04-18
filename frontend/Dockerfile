# ── BOTPILOT AI Frontend ──
# Multi-stage build: build with Node, serve with Nginx

# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# SPA fallback: redirect all routes to index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Create certbot webroot directory
RUN mkdir -p /var/www/certbot
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
