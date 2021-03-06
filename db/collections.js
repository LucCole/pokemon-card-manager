
const { client } = require('./client');

const { 
  getAllCardsForCollection,
} = require('../db/collectionsCards.js');


const { 
  getCardsBySet
} = require('../db/cards.js');

async function createCollection({ set, userId }) {
  try {
    const {rows: [collection]} = await client.query(`
    INSERT INTO collections(set, "userId") 
    VALUES ($1, $2)
    RETURNING *;
    `, [ set, userId]);
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
    RETURNING id;
    `, [id]);

    return collection;
  } catch (error) {
    throw error;
  }
}



// !!! -- are we going to need this??
async function updateCollection({columnsToUpdate, id}) {
  try {

    // const columns = [];
    // const values = [];
    // let i = 1;

    // columnsToUpdate.forEach((columnToUpdate) => {
    //   if(
    //     columnToUpdate.column === 'name' ||
    //     columnToUpdate.column === 'image' ||
    //     columnToUpdate.column === 'numberOfCards' ||
    //     columnToUpdate.column === 'normalCards' ||
    //     columnToUpdate.column === 'secretCards' ||
    //     columnToUpdate.column === 'description'
    //   ){
    //     columns.push(` "${columnToUpdate.column}"=$${i} `);
    //     values.push(columnToUpdate.value);
    //     i++;
    //   }
    // });

    // values.push(id);

    // if(columns.length > 0){
    //   const {rows: [collection]} = await client.query(`
    //   UPDATE collections
    //   SET ${columns}
    //   WHERE id=$${i}
    //   RETURNING *;
    //   `, values);
    //   return collection;
    // }

    return 'There are no columns to update.';
  } catch (error) {
    throw error;
  }
}

async function getCollectionById(id) {
  try {

    console.log('id: ', id);
    const {rows: [collection]} = await client.query(`
    SELECT collections.id AS "collectionId", sets.*
    FROM collections
    JOIN sets ON collections.set = sets.id
    WHERE collections.id=$1;
    `, [id]);

    if(collection){
      // console.log("collection.id", collection.id);
      collection.collectedCards = await getAllCardsForCollection(collection.id);
      collection.cardList = await getCardsBySet(collection.id);
    }

    // console.log(collection);

    return collection;
  } catch (error) {
    throw error;
  }
}

// async function getCollectionByName(name) {
//   try {

//     const {rows: [collection]} = await client.query(`
//     SELECT *
//     FROM collections
//     WHERE name=$1;
//     `, [name]);

    
//     if(collection){
//       collection.cards = await getAllCardsForCollection(collection.id);
//     }

//     return collection;
//   } catch (error) {
//     throw error;
//   }
// }

async function getAllUserCollections(userId) {
  try {

    const {rows: collections} = await client.query(`
    SELECT collections.id AS "collectionId", set.*
    FROM collections
    JOIN set ON collections.set = set.id
    WHERE "userId" = $1;
    `, [userId]);

    for(const collection of collections){
      collection.cards = await getAllCardsForCollection(collection.id);
    }

    return collections;
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


// Should we return and error here?
async function canAccessCollection(collectionId, userId) {
  try{

    const {rows: [collection]} = await client.query(`
    SELECT * FROM collections
    WHERE id = $1
    AND "userId" = $2;
    `, [collectionId, userId]);

    if(collection){
      return true;
    }

    return false;
  }catch(error){
    throw error;
  }
}

module.exports = {
  createCollection,
  deleteCollection,
  updateCollection,
  getCollectionById,
  // getCollectionByName,
  getAllCollections,
  canAccessCollection,
  getAllUserCollections
}
