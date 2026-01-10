# Dockerfile
# Stage 1: Build the React Frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Setup the Backend
FROM node:18-alpine
WORKDIR /app
COPY server/package*.json ./server/
WORKDIR /app/server
RUN npm install
COPY server/ .

# Copy built frontend assets to backend
COPY --from=frontend-build /app/frontend/dist ../dist

# Set production environment
ENV NODE_ENV=production

EXPOSE 3001
CMD ["node", "server.js"]
