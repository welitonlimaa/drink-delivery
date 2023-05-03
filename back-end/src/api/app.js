const express = require('express');
const { registerRoute, loginRoute } = require('../routers');

const app = express();
app.use(express.json());

app.use('/login', loginRoute);

app.use('/register', registerRoute);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
