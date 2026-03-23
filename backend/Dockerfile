FROM node:22-alpine AS deps
WORKDIR /app

# Install workspace deps from the root lockfile
COPY package.json package-lock.json ./
COPY shared/package.json ./shared/package.json
COPY backend/package.json ./backend/package.json
RUN npm ci

# ── Development ────────────────────────────────────────────────────────────────
FROM deps AS dev
COPY shared ./shared
COPY backend ./backend

WORKDIR /app/backend
EXPOSE 3000
CMD ["npm", "run", "dev"]
