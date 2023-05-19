# Drink Delivery

O Drink Delivery é um aplicativo de delivery de cervejas desenvolvido para simplificar o processo de pedidos, preparo e entrega de bebidas de uma distribuidora. Com o Drink Delivery, os clientes podem fazer pedidos diretamente de seus dispositivos móveis, os vendedores gerenciam o fluxo de pedidos e administradores gerenciam o usuários.

## Funcionalidades Principais

* Acesso via login para clientes, vendedores e administradores.
* Comunicação entre clientes e vendedores, permitindo a aprovação, preparo e envio dos pedidos.
* Detalhes dos pedidos visíveis para clientes e vendedores.
* Atualização em tempo real dos status dos pedidos.
* Gerenciamento de usuários em três níveis customer, seller e administrator.

## Tecnologias Utilizadas

* Node.js
* MySQL
* JWT (JSON Web Tokens)
* React.js
* Express.js
* Sequelize
* Tailwind CSS

## Banco de Dados 

![Diagrama de ER](./assets/erdr.png)

## Deploy

* API: https://drink-delivery-api.up.railway.app/
* Front-end: https://drink-delivery.vercel.app/

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/welitonlimaa/drink-delivery.git
```
2. Instale as dependências:
```bash
npm install
```
3. Rode os serviços Node e MySQL com o comando:
```bash
docker-compose up -d --build
```
4. Execute a aplicação:
```bash
npm start
```

