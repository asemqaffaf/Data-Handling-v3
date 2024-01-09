# Step 1: Build the application
FROM node:16 as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Step 2: Set up the production environment
FROM node:16-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./

RUN npm install --only=production

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]
