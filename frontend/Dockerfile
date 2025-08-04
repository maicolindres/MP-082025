FROM node:18-alpine

WORKDIR /app

# Copia package.json y package-lock.json y ejecuta la instalación
COPY package*.json ./
RUN npm install

# Copia el resto del código
COPY . .

# Configura el puerto (si usas create-react-app, por ejemplo)
ENV PORT=3001

EXPOSE 3001

CMD ["npm", "start"]