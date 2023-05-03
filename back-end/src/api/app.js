const express = require('express');
const { userRoutes } = require('../routers');

const app = express();
app.use(express.json());

app.use('/login', userRoutes);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
