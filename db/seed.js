const { 
  createUser
} = require('./index');

const { 
  client
} = require('./client');


async function buildTables() {
try {

  // Client
  client.connect();

  // Drop Tables
  await client.query(`
    DROP TABLE IF EXISTS users;
  `);

  // Create Tables
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

} catch (error) {
  console.error("Error building tables!");
  throw error;
}
}

async function populateInitialData() {
  try {
 
    // users
    const usersToCreate = [
      { username: 'albert', password: 'bertie99', email:'albert@gmail.com' },
      { username: 'sandra', password: 'sandra123', email:'sandra@gmail.com' },
      { username: 'glamgal', password: 'glamgal123', email:'glamgal@gmail.com' },
      { username: 'pruplebarny', password: 'barney123', email:'barney@gmail.com' },
      { username: 'luc', password: '12345678', email:'luc@gmail.com', isAdmin:true },
    ];

    const users = await Promise.all(usersToCreate.map(createUser));
    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');

  } catch (error) {
    console.error("Error building tables!", error)
    throw error;
  }
}

buildTables()
.then(populateInitialData)
.catch(console.error)
.finally(() => client.end());
