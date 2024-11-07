const express = require('express');
const app = express();
const pool = require('./config/db');
require('dotenv').config();

app.use(express.json());

// Ruta de verificación de salud del servicio
app.get('/health', (req, res) => {
  res.send('Auth service is running');
});

// Ruta de ejemplo para autenticación
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // Lógica de autenticación aquí...
  res.send(`Login request for user: ${email}`);
});

app.listen(process.env.PORT, () => {
  console.log(`Auth service listening on port ${process.env.PORT}`);
});
