
const { client } = require('./client');

async function createCollection({ name, image, numberOfCards, normalCards, secretCards, description, userId }) {
  try {

    const {rows: [collection]} = await client.query(`
    INSERT INTO collections(name, image, "numberOfCards", "normalCards", "secretCards", description, "userId") 
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `, [ name, image, numberOfCards, normalCards, secretCards, description, userId ]);

    return collection;
  } catch (error) {
    throw error;
  }
}

async function deleteCollection(id) {
  try {

    const {rows: [collection]} = await client.query(`
    DELETE FROM collections
    WHERE id=$1
    RETURNING id, name;
    `, [id]);

    return collection;
  } catch (error) {
    throw error;
  }
}

async function updateCollection({columnsToUpdate, id}) {
  try {

    const columns = [];
    const values = [];
    let i = 1;

    columnsToUpdate.forEach((columnToUpdate) => {
      if(
        columnToUpdate.column === 'name' ||
        columnToUpdate.column === 'image' ||
        columnToUpdate.column === 'numberOfCards' ||
        columnToUpdate.column === 'normalCards' ||
        columnToUpdate.column === 'secretCards' ||
        columnToUpdate.column === 'description'
      ){
        columns.push(` "${columnToUpdate.column}"=$${i} `);
        values.push(columnToUpdate.value);
        i++;
      }
    });

    values.push(id);

    if(columns.length > 0){
      const {rows: [collection]} = await client.query(`
      UPDATE collections
      SET ${columns}
      WHERE id=$${i}
      RETURNING *;
      `, values);
      return collection;
    }

    return 'There are no columns to update.';
  } catch (error) {
    throw error;
  }
}

async function getCollectionById(id) {
  try {

    const {rows: [collection]} = await client.query(`
    SELECT *
    FROM collections
    WHERE id=$1;
    `, [id]);

    return collection;
  } catch (error) {
    throw error;
  }
}

async function getCollectionByName(name) {
  try {

    const {rows: [collection]} = await client.query(`
    SELECT *
    FROM collections
    WHERE name=$1;
    `, [name]);

    return collection;
  } catch (error) {
    throw error;
  }
}

async function getAllCollections() {
  try {

    const {rows: collections} = await client.query(`
    SELECT *
    FROM collections;
    `);

    return collections;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createCollection,
  deleteCollection,
  updateCollection,
  getCollectionById,
  getCollectionByName,
  getAllCollections
}
