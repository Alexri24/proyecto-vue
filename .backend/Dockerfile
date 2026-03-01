# Usamos una imagen de Node ligera
FROM node:20-alpine
# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de configuración y la base de datos
COPY package*.json ./
COPY db.json ./

# Instalamos json-server
RUN npm install

# Exponemos el puerto 3000
EXPOSE 3000

# Comando para arrancar el servidor permitiendo conexiones externas (--host 0.0.0.0)
CMD ["npx", "json-server", "--watch", "db.json", "--port", "3000", "--host", "0.0.0.0"]