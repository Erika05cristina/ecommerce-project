const express = require('express');
const app = express();
const pool = require('./config/db'); // Conexión a la base de datos
require('dotenv').config();

app.use(express.json());

// Ruta de verificación de salud
app.get('/health', (req, res) => {
  res.send('Service is running');
});

// Crear un nuevo usuario (sin cifrar la contraseña)
app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email and password are required' });
  }

  try {
    // Inserta el nuevo usuario con la contraseña en texto plano
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error while creating user' });
  }
});

// Obtener todos los usuarios
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error while fetching users' });
  }
});

// Levanta el servidor en el puerto especificado en .env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Service listening on port ${PORT}`);
});
