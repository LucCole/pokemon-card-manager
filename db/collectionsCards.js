
const { client } = require('./client');

async function createCollectionCard({ collectionId, cardId }) {
  try {

    const {rows: [collectionCard]} = await client.query(`
    INSERT INTO "collections_cards"("collectionId", "cardId") 
    VALUES ($1, $2)
    RETURNING *;
    `, [ collectionId, cardId ]);
    
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
    SELECT collections_cards."cardId"
    FROM "collections_cards"
    WHERE "collectionId"=$1;
    `, [id]);

    const cards = [];

    for(let i = 0; i < collectionCards.length; i++){
      cards.push(collectionCards[i].cardId);
    }

    // console.log('collectionCards', collectionCards);

    return cards;
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
