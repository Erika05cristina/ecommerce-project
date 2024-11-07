const express = require('express');
const app = express();
const pool = require('./config/db'); // Conexión a la base de datos
require('dotenv').config();

app.use(express.json());

// Ruta de verificación de salud
app.get('/health', (req, res) => {
  res.send('Service is running');
});


app.get('/users', async (req, res) => {
  // Lógica para obtener todos los usuarios
  res.send('List of users');
});

app.put('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  // Lógica para actualizar información del usuario
  res.send(`User ${userId} updated`);
});

// Levanta el servidor en el puerto especificado en .env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Service listening on port ${PORT}`);
});
