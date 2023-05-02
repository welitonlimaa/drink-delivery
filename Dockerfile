# Usar a imagem node:16.14-alpine como base

FROM node:16.14-alpine
# Mudar para o diretório de trabalho /app-backend

WORKDIR /back-end

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]