# 1. Developpement container
FROM node AS developpement
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# 2. Production container
FROM node:current-alpine3.14 AS production
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build
EXPOSE 3000

ENV PORT 3000
CMD ["npm", "start"]