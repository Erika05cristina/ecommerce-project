# Usa una imagen de Node para compilar la aplicación de Angular
FROM node:18 AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instala las dependencias de Angular
RUN npm install

# Copia el código fuente de Angular al contenedor
COPY . .

# Construye la aplicación de Angular
RUN npm run build --prod

# Usa una imagen de Nginx para servir la aplicación estática
FROM nginx:alpine

# Copia los archivos de la compilación de Angular al directorio de Nginx
COPY --from=build /app/dist/ecommerce-frontend /usr/share/nginx/html

# Copia el archivo de configuración de Nginx personalizado
COPY nginx.conf /etc/nginx/nginx.conf

# Expone el puerto 80 para acceder a la aplicación
EXPOSE 80

# Comando para mantener Nginx corriendo en primer plano
CMD ["nginx", "-g", "daemon off;"]
