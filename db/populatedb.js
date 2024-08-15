const { Client } = require("pg");
require("dotenv").config();

const CONNECTION_STRING = process.env.CONNECTION_STRING;

const SQL = `
CREATE TABLE IF NOT EXISTS animes (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  release_date DATE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5)
);

CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS anime_categories (
  anime_id INT REFERENCES animes(id) ON DELETE CASCADE,
  category_id INT REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (anime_id, category_id)
);

INSERT INTO animes (title, description, release_date, rating) 
VALUES ('Naruto', 'A young ninja who seeks recognition.', '2002-10-03', 3),
       ('One Piece', 'A pirate adventure story.', '1999-10-20', 4);

INSERT INTO categories (name) 
VALUES ('Action'),
       ('Adventure'),
       ('Mystery');

INSERT INTO anime_categories (anime_id, category_id) VALUES 
(1, 1), 
(1, 2), 
(2, 1), 
(2, 2), 
(2, 3);
`;

const main = async () => {
  console.log("Seeding...");
  const client = new Client({
    connectionString: CONNECTION_STRING,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Done");
};

main();
