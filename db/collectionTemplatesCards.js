
const { client } = require('./client');

async function createCollectionTemplateCard({ collectionTemplateId, cardId }) {
  try {

    const {rows: [collectionTemplate]} = await client.query(`
    INSERT INTO "collectionTemplates_cards"("collectionTemplateId", "cardId") 
    VALUES ($1, $2)
    RETURNING *;
    `, [ collectionTemplateId, cardId ]);

    return collectionTemplate;
  } catch (error) {
    throw error;
  }
}

async function deleteCollectionTemplateCard(id) {
  try {

    const {rows: [collectionTemplate]} = await client.query(`
    DELETE FROM "collectionTemplates_cards"
    WHERE id=$1
    RETURNING id;
    `, [id]);

    return collectionTemplate;
  } catch (error) {
    throw error;
  }
}

async function deleteAllCollectionTemplateCards(id) {
  try {

    const {rows: collectionTemplateCards} = await client.query(`
    DELETE FROM "collectionTemplates_cards"
    WHERE "collectionTemplateId"=$1
    RETURNING id;
    `, [id]);

    return collectionTemplateCards;
  } catch (error) {
    throw error;
  }
}

async function getAllCardsForCollectionTemplate(id) {
  try {

    const {rows: collectionCards} = await client.query(`
    SELECT cards.*
    FROM "collectionTemplates_cards"
    JOIN cards ON "collectionTemplates_cards"."cardId" = cards.id
    WHERE "collectionTemplateId"=$1;
    `, [id]);

    return collectionCards;
  } catch (error) {
    throw error;
  }
}

async function getCollectionTemplateCardById(id) {
  try {

    const {rows: [collectionTemplateCard]} = await client.query(`
    SELECT *
    FROM "collectionTemplates_cards"
    WHERE id=$1;
    `, [id]);

    return collectionTemplateCard;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createCollectionTemplateCard,
  deleteCollectionTemplateCard,
  deleteAllCollectionTemplateCards,
  getAllCardsForCollectionTemplate,
  getCollectionTemplateCardById
}
