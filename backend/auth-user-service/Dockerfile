# Usa una imagen base de Node.js
FROM node:14

# Crea y establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Establece la variable de entorno para producción
ENV NODE_ENV=production

# Expone el puerto (cambia el puerto según el microservicio)
EXPOSE 3001

# Comando para ejecutar la aplicación
CMD ["node", "server.js"]
