FROM node:18-alpine

WORKDIR /app

# Copia package.json y package-lock.json y ejecuta la instalación
COPY package*.json ./
RUN npm install

# Copia el resto del código
COPY . .

EXPOSE 3000

CMD ["npm", "start"]