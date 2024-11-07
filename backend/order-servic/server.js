const express = require('express');
const app = express();
const pool = require('./config/db'); // Conexión a la base de datos
require('dotenv').config();

app.use(express.json());

// Ruta de verificación de salud
app.get('/health', (req, res) => {
  res.send('Service is running');
});



app.get('/orders', async (req, res) => {
    // Lógica para obtener todos los pedidos
    res.send('List of orders');
  });
  
  app.post('/orders', async (req, res) => {
    const { userId, products } = req.body;
    // Lógica para crear un nuevo pedido
    res.send(`Order created for user: ${userId}`);
  });
  

// Levanta el servidor en el puerto especificado en .env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Service listening on port ${PORT}`);
});
