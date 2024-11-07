const express = require('express');
const app = express();
const pool = require('./config/db'); // Conexión a la base de datos
require('dotenv').config();

app.use(express.json());

// Ruta de verificación de salud
app.get('/health', (req, res) => {
  res.send('Service is running');
});


app.get('/products', async (req, res) => {
  // Lógica para obtener todos los productos
  res.send('List of products');
});

app.post('/products', async (req, res) => {
  const { name, price, description } = req.body;
  // Lógica para agregar un producto
  res.send(`Product added: ${name}`);
});


// Levanta el servidor en el puerto especificado en .env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Service listening on port ${PORT}`);
});
