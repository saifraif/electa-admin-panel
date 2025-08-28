# ===== Stage 1: Base =====
FROM node:18-alpine AS base

WORKDIR /app

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

# ===== Stage 2: Development =====
FROM base AS development

EXPOSE 3000

CMD ["npm", "start"]

# ===== Stage 3: Production =====
FROM base AS production

RUN npm run build
RUN npm install -g serve

WORKDIR /app

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
