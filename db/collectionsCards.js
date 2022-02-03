
const { client } = require('./client');

async function createCollectionCard({ collectionId, cardId, collected }) {
  try {

    const {rows: [collectionCard]} = await client.query(`
    INSERT INTO "collections_cards"("collectionId", "cardId", collected) 
    VALUES ($1, $2, $3)
    RETURNING *;
    `, [ collectionId, cardId, collected ]);
    
    return collectionCard;
  } catch (error) {
    throw error;
  }
}

async function deleteCollectionCard(id) {
  try {

    const {rows: [collectionCard]} = await client.query(`
    DELETE FROM "collections_cards"
    WHERE id=$1
    RETURNING id;
    `, [id]);

    return collectionCard;
  } catch (error) {
    throw error;
  }
}

async function getCollectionCardById(id) {
  try {

    const {rows: [collectionCard]} = await client.query(`
    SELECT *
    FROM "collections_cards"
    WHERE id=$1;
    `, [id]);

    return collectionCard;
  } catch (error) {
    throw error;
  }
}

async function deleteAllCollectionsCards(id) {
  try {

    const {rows: [collectionCard]} = await client.query(`
    DELETE FROM "collections_cards"
    WHERE "collectionId"=$1
    RETURNING id;
    `, [id]);

    return collectionCard;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createCollectionCard,
  deleteCollectionCard,
  getCollectionCardById,
  deleteAllCollectionsCards
}
