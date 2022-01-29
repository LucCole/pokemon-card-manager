// const { 
// } = require('./index');

const { 
  client
} = require('./client');


async function buildTables() {
try {

  // Client
  client.connect();

  // drop tables

  // create tables

} catch (error) {
  console.error("Error building tables!");
  throw error;
}
}

async function populateInitialData() {
  try {
 
    // Initial data

  } catch (error) {
    console.error("Error building tables!", error)
    throw error;
  }
}

buildTables()
.then(populateInitialData)
.catch(console.error)
.finally(() => client.end());
