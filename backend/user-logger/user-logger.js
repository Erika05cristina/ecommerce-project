const { Client } = require('pg');
const yaml = require('js-yaml');
const fs = require('fs');
require('dotenv').config();

// Conectar a PostgreSQL con manejo de errores
const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

client.connect().catch(err => {
  console.error('Error al conectar a la base de datos:', err);
  process.exit(1); // Termina el proceso si la conexión falla
});

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

// Ejecutar periódicamente para actualizar el archivo YAML
setInterval(() => {
  saveUserToYAML().catch(err => {
    console.error('Error al ejecutar saveUserToYAML:', err);
  });
}, 30000); // Actualiza cada 60 segundos

// Manejo global de promesas no manejadas
process.on('unhandledRejection', (reason, promise) => {
  console.error('Promesa no manejada:', promise, 'razón:', reason);
  // Podrías elegir terminar el proceso si es necesario
  // process.exit(1);
});
