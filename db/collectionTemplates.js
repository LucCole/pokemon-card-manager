
const { client } = require('./client');

const { 
  getAllCardsForCollectionTemplate
} = require('../db/collectionTemplatesCards.js');

async function createCollectionTemplate({ name, image, numberOfCards, normalCards, secretCards, description, creatorId }) {
  try {

    const {rows: [collectionTemplate]} = await client.query(`
    INSERT INTO "collectionTemplates"(name, image, "numberOfCards", "normalCards", "secretCards", description, "creatorId") 
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `, [ name, image, numberOfCards, normalCards, secretCards, description, creatorId ]);

    return collectionTemplate;
  } catch (error) {
    throw error;
  }
}

async function deleteCollectionTemplate(id) {
  try {

    const {rows: [collectionTemplate]} = await client.query(`
    DELETE FROM "collectionTemplates"
    WHERE id=$1
    RETURNING id, name;
    `, [id]);

    return collectionTemplate;
  } catch (error) {
    throw error;
  }
}

async function updateCollectionTemplate({columnsToUpdate, id}) {
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
      const {rows: [collectionTemplate]} = await client.query(`
      UPDATE "collectionTemplates"
      SET ${columns}
      WHERE id=$${i}
      RETURNING *;
      `, values);
      return collectionTemplate;
    }

    return 'There are no columns to update.';
  } catch (error) {
    throw error;
  }
}

async function getCollectionTemplateById(id) {
  try {

    const {rows: [collectionTemplate]} = await client.query(`
    SELECT *
    FROM "collectionTemplates"
    WHERE id=$1;
    `, [id]);

    return collectionTemplate;
  } catch (error) {
    throw error;
  }
}

async function getCollectionTemplateByName(name) {
  try {

    const {rows: [collectionTemplate]} = await client.query(`
    SELECT *
    FROM "collectionTemplates"
    WHERE name=$1;
    `, [name]);

    return collectionTemplate;
  } catch (error) {
    throw error;
  }
}

async function getAllUserCollectionTemplates(userId) {
  try {

    const {rows: collectionTemplates} = await client.query(`
    SELECT *
    FROM "collectionTemplates"
    WHERE "creatorId" = $1;
    `, [userId]);

    for(const collectionTemplate of collectionTemplates){
      collectionTemplate.cards = await getAllCardsForCollectionTemplate(collectionTemplate.id);
    }

    return collectionTemplates;
  } catch (error) {
    throw error;
  }
}

async function getAllCollectionTemplates() {
  try {

    const {rows: collectionTemplates} = await client.query(`
    SELECT *
    FROM "collectionTemplates";
    `);

    return collectionTemplates;
  } catch (error) {
    throw error;
  }
}

async function canAccessCollectionTemplate(collectionTemplateId, userId) {
  try{

    const {rows: [collectionTemplate]} = await client.query(`
    SELECT * FROM "collectionTemplates"
    WHERE id = $1
    AND "userId" = $2;
    `, [collectionTemplateId, userId]);

    if(collectionTemplate){
      return true;
    }

    return false;
  }catch(error){
    throw error;
  }
}

module.exports = {
  createCollectionTemplate,
  deleteCollectionTemplate,
  updateCollectionTemplate,
  getCollectionTemplateById,
  getCollectionTemplateByName,
  getAllCollectionTemplates,
  canAccessCollectionTemplate,
  getAllUserCollectionTemplates
}
