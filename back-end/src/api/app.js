const express = require('express');

const app = express();
app.use(express.json());

app.use('/login', userRoutes);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
