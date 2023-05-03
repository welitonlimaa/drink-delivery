const express = require('express');
const { userRoutes, loginRoutes } = require('../routers');

const app = express();
app.use(express.json());

app.use('/login', loginRoutes);

app.use('/register', userRoutes);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
