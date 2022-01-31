const { 
  populateInitialData
} = require('./seedData');

const { 
  client
} = require('./client');


async function buildTables() {
try {

  // Client
  client.connect();
  console.log('Connected to client');

  // Drop Tables
  await client.query(`
    DROP TABLE IF EXISTS "collections_cards";
    DROP TABLE IF EXISTS collections;
    DROP TABLE IF EXISTS "collectionTemplates_cards";
    DROP TABLE IF EXISTS "collectionTemplates";
    DROP TABLE IF EXISTS cards;
    DROP TABLE IF EXISTS sets;
    DROP TABLE IF EXISTS users;
  `);
  console.log('Dropped tables');


  // Create Tables

  // Users
  await client.query(`
  CREATE TABLE users(
    id SERIAL PRIMARY KEY, 
    username VARCHAR(255) NOT NULL, 
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    "isAdmin" BOOLEAN DEFAULT false,
    UNIQUE (username, email)
  );
  `);
  console.log('Created users table');

  // Sets
  await client.query(`
  CREATE TABLE sets(
    id SERIAL PRIMARY KEY, 
    name VARCHAR(255) NOT NULL, 
    series VARCHAR(255),
    logo VARCHAR(500),
    "numberOfCards" INTEGER,
    "normalCards" INTEGER,
    "secretCards" INTEGER
  );
  `);
  console.log('Created users table');

  // Cards
  await client.query(`
  CREATE TABLE cards(
    id SERIAL PRIMARY KEY, 
    name VARCHAR(100) NOT NULL,
    image VARCHAR(500),
    set INTEGER REFERENCES sets(id),
    "numberInSet" INTEGER,
    rarity VARCHAR(100),
    version VARCHAR(100),
    "cardType" VARCHAR(100),
    type VARCHAR(100),
    "hitPoints" INTEGER,
    artist VARCHAR(100)
  );
  `);
  console.log('Created cards table');

  // Collection Templates
  await client.query(`
  CREATE TABLE "collectionTemplates"(
    id SERIAL PRIMARY KEY, 
    name VARCHAR(100) NOT NULL, 
    image VARCHAR(500),
    "numberOfCards" INTEGER,
    "normalCards" INTEGER,
    "secretCards" INTEGER,
    description VARCHAR(1000),
    "creatorId" INTEGER REFERENCES users(id) NOT NULL
  );
  `);
  console.log('Created collection templates table');

  // Collection Templates
  await client.query(`
  CREATE TABLE "collectionTemplates_cards"(
    id SERIAL PRIMARY KEY, 
    "collectionTemplateId" INTEGER REFERENCES "collectionTemplates"(id) NOT NULL, 
    "cardId" INTEGER REFERENCES cards(id) NOT NULL, 
    collected BOOLEAN
  );
  `);
  console.log('Created collection templates table');

  // Collections
  await client.query(`
  CREATE TABLE collections(
    id SERIAL PRIMARY KEY, 
    name VARCHAR(100) NOT NULL, 
    image VARCHAR(500),
    "numberOfCards" INTEGER,
    "normalCards" INTEGER,
    "secretCards" INTEGER,
    description VARCHAR(1000),
    "userId" INTEGER REFERENCES users(id) NOT NULL
  );
  `);
  console.log('Created collections table');

  // Collection Cards
  await client.query(`
  CREATE TABLE "collections_cards"(
    id SERIAL PRIMARY KEY, 
    "collectionId" INTEGER REFERENCES collections(id) NOT NULL, 
    "cardId" INTEGER REFERENCES cards(id) NOT NULL, 
    collected BOOLEAN
  );
  `);
  console.log('Created collection templates table');

  console.log('Finished creating tables');

} catch (error) {
  console.error("Error building tables!");
  throw error;
}
}

buildTables()
.then(populateInitialData)
.catch(console.error)
.finally(() => client.end());
