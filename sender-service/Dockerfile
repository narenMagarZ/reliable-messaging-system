FROM node:22-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22
WORKDIR /app
COPY package*. ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

CMD [ "node", "dist/index.js" ]