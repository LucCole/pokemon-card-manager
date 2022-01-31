
const { client } = require('./client');

async function createCollectionTemplateCard({ collectionTemplateId, cardId, collected }) {
  try {

    const {rows: [collectionTemplate]} = await client.query(`
    INSERT INTO "collectionTemplates_cards"("collectionTemplateId", "cardId", collected) 
    VALUES ($1, $2, $3)
    RETURNING *;
    `, [ collectionTemplateId, cardId, collected ]);

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
  getCollectionTemplateCardById
}
