const express = require('express');
const cors = require('cors');
const path = require('path');
const { userRoutes, loginRoute, productRoutes, saleRoutes } = require('../routers');

const app = express();

app.use(cors({
  origin: '*',
}));

app.use(express.static(path.join(__dirname, '../../public')));

app.use(express.json());

app.use('/login', loginRoute);

app.use('/users', userRoutes);

app.use('/products', productRoutes);

app.use('/sales', saleRoutes);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
