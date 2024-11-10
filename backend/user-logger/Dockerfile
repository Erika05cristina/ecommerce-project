# Usa una imagen base de Node.js
FROM node:14

# Crear el directorio de trabajo
WORKDIR /app

# Copiar archivos
COPY package*.json ./
RUN npm install
COPY . .

# Crear un volumen para el archivo de salida YAML
VOLUME /output

# Exponer las variables de entorno de producción
ENV NODE_ENV=production

# Comando para ejecutar el servicio
CMD ["node", "user-logger.js"]
