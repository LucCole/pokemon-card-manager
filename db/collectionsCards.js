
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

async function deleteAllCollectionsCards(id) {
  try {

    // ?? rows : collectionCards ?? should't this be the plural var?
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

async function getAllCardsForCollection(id) {
  try {

    const {rows: collectionCards} = await client.query(`
    SELECT "collections_cards".collected, cards.*
    FROM "collections_cards"
    JOIN cards ON "collections_cards"."cardId" = cards.id
    WHERE "collectionId"=$1;
    `, [id]);

    return collectionCards;
  } catch (error) {
    throw error;
  }
}

async function updateCardCollectedStatus({ collected, id }) {
  try {

    const {rows: [collectionCard]} = await client.query(`
    UPDATE "collections_cards"
    SET collected=$1
    WHERE id=$2
    RETURNING *;
    `, [collected, id]);
    return collectionCard;

  } catch (error) {
    throw error;
  }
}

async function getCollectionCardById(id) {
  try {

    const {rows: [collectionCard]} = await client.query(`
    SELECT id, "collectionId"
    FROM "collections_cards"
    WHERE id=$1;
    `, [id]);

    return collectionCard;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createCollectionCard,
  deleteCollectionCard,
  deleteAllCollectionsCards,
  getCollectionCardById,
  getAllCardsForCollection,
  updateCardCollectedStatus
}
