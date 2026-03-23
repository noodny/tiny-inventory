FROM node:22-alpine AS deps
WORKDIR /app

# Install workspace deps from the root lockfile
COPY package.json package-lock.json ./
COPY shared/package.json ./shared/package.json
COPY frontend/package.json ./frontend/package.json
RUN npm ci

# ── Development ────────────────────────────────────────────────────────────────
FROM deps AS dev
COPY shared ./shared
COPY frontend ./frontend

WORKDIR /app/frontend
EXPOSE 3001
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
