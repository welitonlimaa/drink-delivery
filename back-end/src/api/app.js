const express = require('express');
const cors = require('cors');
const { registerRoute, loginRoute, productRoutes } = require('../routers');

const app = express();

app.use(cors({
  origin: '*',
}));

app.use(express.json());

app.use('/login', loginRoute);

app.use('/register', registerRoute);

app.use('/products', productRoutes);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
