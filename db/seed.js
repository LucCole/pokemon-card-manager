const { 
  createUser,
  createSet
} = require('./index');

const { 
  client
} = require('./client');


async function buildTables() {
try {

  // Client
  console.log('Connecting to client');
  client.connect();
  console.log('Connected to client');


  // Drop Tables
  console.log('Dropping tables');
  await client.query(`
    DROP TABLE IF EXISTS sets;
    DROP TABLE IF EXISTS users;
  `);
  console.log('Dropped tables');


  // Create Tables
  console.log('Creating tables');

  // Users
  console.log('Creating users table');
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
  console.log('Creating sets table');
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
