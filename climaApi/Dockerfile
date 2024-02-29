# Utiliza una imagen base de  Node.js
FROM node:14

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo package.json al directorio de trabajo
COPY package.json /app

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos al directorio de trabajo
COPY . /app

# Expone el puerto 5001
EXPOSE 5001

# Inicia la aplicación
CMD ["npm", "start"]