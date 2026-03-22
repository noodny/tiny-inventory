FROM node:22-alpine AS deps
WORKDIR /app

# Install workspace deps from the root lockfile
COPY package.json package-lock.json ./
COPY backend/package.json ./backend/package.json
COPY frontend/package.json ./frontend/package.json
RUN npm ci

# ── Development ────────────────────────────────────────────────────────────────
FROM deps AS dev
COPY frontend ./frontend
WORKDIR /app/frontend
EXPOSE 3001
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
