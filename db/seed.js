const { 
  createUser,
  createSet,
  createCard
} = require('./index');

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


  // set should probably be an id pointing to the set table.
  // should group also be a table?
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

  console.log('Finished creating tables');

} catch (error) {
  console.error("Error building tables!");
  throw error;
}
}

async function populateInitialData() {
  try {

    console.log('Starting to seed database');

 
    // Users
    console.log('Creating users');
    const usersToCreate = [
      { username: 'albert', password: 'bertie99', email:'albert@gmail.com' },
      { username: 'sandra', password: 'sandra123', email:'sandra@gmail.com' },
      { username: 'glamgal', password: 'glamgal123', email:'glamgal@gmail.com' },
      { username: 'pruplebarny', password: 'barney123', email:'barney@gmail.com' },
      { username: 'luc', password: '12345678', email:'luc@gmail.com', isAdmin:true }
    ];

    const users = await Promise.all(usersToCreate.map(createUser));
    console.log('Finished creating users!');
    console.log(users);

    // Sets
    console.log('Creating sets');
    const setsToCreate = [
      { 
        name: 'Sun & Moon (Base)', 
        series: 'Sun & Moon',
        logo: 'https://www.serebii.net/card/logo/sunmoon-th.png',
        numberOfCards: 161,
        normalCards: 149,
        secretCards: 12
      },
      { 
        name: 'Sword & Shield (Base)', 
        series: 'Sword & Shield',
        logo: 'https://www.serebii.net/card/logo/cosmiceclipse-th.png',
        numberOfCards: 216,
        normalCards: 202,
        secretCards: 14
      },
      { 
        name: 'HeartGold SoulSilver (Base)', 
        series: 'HeartGold SoulSilver',
        logo: 'https://www.serebii.net/card/logo/heartgoldsoulsilver-th.png',
        numberOfCards: 124,
        normalCards: 123,
        secretCards: 1
      },
    ];

    const sets = await Promise.all(setsToCreate.map(createSet));
    console.log('Finished creating sets!');
    console.log(sets);

    // Cards
    const cardsToCreate = [
      { 
        name: 'Drizzile',
        image: 'https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/1645076.jpg',
        set: 1,
        setNum: 56,
        rarity: 'Uncommon',
        version: 'Normal',
        cardType: 'Pokémon - Stage 1',
        type: 'Water',
        hitPoints: 90,
        artist: 'Naoki Saito'
      },
      { 
        name: 'Arceus & Dialga & Palkia GX',
        image: 'https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/1605919.jpg',
        set: 2,
        setNum: 156,
        rarity: 'Rare Holo GX',
        version: 'Hollo',
        cardType: 'Pokémon - TAG TEAM',
        type: 'Dragon',
        hitPoints: 90,
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Ordinary Rod',
        image: 'https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/1645191.jpg',
        set: 2,
        setNum: 171,
        rarity: 'Uncommon',
        version: 'Normal',
        cardType: 'Trainer - Item',
        type: null,
        hitPoints: null,
        artist: '5ban Graphics',
      },
      { 
        name: 'Ditto',
        image: 'https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/302988.jpg',
        set: 3,
        setNum: 17,
        rarity: 'Rare',
        version: 'Normal',
        cardType: 'Pokémon',
        type: 'Normal',
        hitPoints: 40,
        artist: null,
      }
    ];

    const cards = await Promise.all(cardsToCreate.map(createCard));
    console.log('Finished creating Cards!');
    console.log(cards);

    console.log('Finished to seeding database');

  } catch (error) {
    console.error("Error building tables!", error);
    throw error;
  }
}

buildTables()
.then(populateInitialData)
.catch(console.error)
.finally(() => client.end());
