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

app.post('/login', async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ error: 'Name and password are required' });
  }

  try {
    // Buscar el usuario por nombre
    const result = await pool.query('SELECT * FROM users WHERE name = $1', [name]);
    
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'User not found' });
    }

    const user = result.rows[0];

    // Comparar la contraseña (en texto plano)
    if (user.password !== password) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Si las credenciales son correctas, devolvemos un mensaje de éxito
    res.status(200).json({ message: 'Login successful' });

  } catch (error) {
    res.status(500).json({ error: 'Error during login' });
  }
});
app.listen(process.env.PORT, () => {
  console.log(`Auth service listening on port ${process.env.PORT}`);
});
