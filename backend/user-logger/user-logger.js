const { Client } = require('pg');
const yaml = require('js-yaml');
const fs = require('fs');
require('dotenv').config();

// Configuración de PostgreSQL
const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Función para conectar a la base de datos con reintentos
async function connectToDatabase() {
  let connected = false;
  let attempts = 0;
  const maxAttempts = 10; // Máximo de intentos de conexión
  while (!connected && attempts < maxAttempts) {
    try {
      await client.connect();
      console.log("Conectado a la base de datos.");
      connected = true;
    } catch (err) {
      attempts++;
      console.error(`Error al conectar a la base de datos (intento ${attempts}):`, err);
      await new Promise(resolve => setTimeout(resolve, 10000)); // Espera 5 segundos antes de reintentar
    }
  }
  if (!connected) {
    console.error("No se pudo conectar a la base de datos después de varios intentos.");
    process.exit(1); // Termina el proceso si no logra conectar después de los intentos
  }
}

// Función para guardar usuarios en YAML
const saveUserToYAML = async () => {
  try {
    const res = await client.query('SELECT * FROM users'); 
    const yamlData = yaml.dump(res.rows);

    // Guardar en la carpeta frontend
    fs.writeFileSync('/output/users.yaml', yamlData, 'utf8');
    console.log('Archivo YAML actualizado con usuarios.');
  } catch (err) {
    console.error('Error al guardar usuarios en YAML:', err);
  }
};

// Ejecuta periódicamente para actualizar el archivo YAML
setInterval(() => {
  saveUserToYAML().catch(err => {
    console.error('Error al ejecutar saveUserToYAML:', err);
  });
}, 30000); // Actualiza cada 30 segundos

// Manejo global de promesas no manejadas
process.on('unhandledRejection', (reason, promise) => {
  console.error('Promesa no manejada:', promise, 'razón:', reason);
});

// Llamar a la función de conexión
connectToDatabase();
