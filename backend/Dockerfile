FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 backend

COPY package.json package-lock.json* ./
RUN npm ci --only=production

COPY --from=builder --chown=backend:nodejs /app/dist ./dist
COPY --chown=backend:nodejs ./data ./data

USER backend

EXPOSE 5000

CMD ["node", "dist/server.js"]