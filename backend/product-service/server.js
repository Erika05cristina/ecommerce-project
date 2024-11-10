const express = require('express');
const mysql = require('mysql2');  // Importamos mysql2
const app = express();
require('dotenv').config();

app.use(express.json());

// Configuración de la base de datos
const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  port: process.env.MYSQL_PORT,
};

// Ruta de verificación de salud
app.get('/health', (req, res) => {
  res.send('El servicio está en funcionamiento');
});

// Obtener todos los productos
app.get('/products', (req, res) => {
  const connection = mysql.createConnection(dbConfig);
  
  connection.query('SELECT * FROM products', (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al obtener los productos' });
      return;
    }
    res.status(200).json(results);
  });

  connection.end();  // Cerrar la conexión
});

// Agregar un nuevo producto
app.post('/products', (req, res) => {
  const { name, price, description } = req.body;

  if (!name || !price || !description) {
    return res.status(400).json({ error: 'El nombre, precio y descripción son requeridos' });
  }

  const connection = mysql.createConnection(dbConfig);

  connection.query(
    'INSERT INTO products (name, price, description) VALUES (?, ?, ?)',
    [name, price, description],
    (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error al agregar el producto' });
        return;
      }
      res.status(201).json({ message: 'Producto agregado con éxito' });
    }
  );

  connection.end();  // Cerrar la conexión
});

// Modificar un producto existente
app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;

  const connection = mysql.createConnection(dbConfig);

  connection.query(
    'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?',
    [name, price, description, id],
    (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
        return;
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.status(200).json({ message: 'Producto actualizado con éxito' });
    }
  );

  connection.end();  // Cerrar la conexión
});

// Eliminar un producto
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;

  const connection = mysql.createConnection(dbConfig);

  connection.query(
    'DELETE FROM products WHERE id = ?',
    [id],
    (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
        return;
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.status(200).json({ message: 'Producto eliminado con éxito' });
    }
  );

  connection.end();  // Cerrar la conexión
});

// Levanta el servidor en el puerto especificado en .env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servicio escuchando en el puerto ${PORT}`);
});
