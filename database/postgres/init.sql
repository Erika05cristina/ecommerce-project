CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL
);

INSERT INTO users (name, email, password) VALUES 
('Erika Villa', 'erika@example.com', 'erika'),
('Jorge Marquez', 'jorge@example.com', 'jorge');




