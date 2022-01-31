
const { client } = require('./client');

async function createCard({ name, image, set, numberInSet, rarity, version, cardType, type, hitPoints, artist }) {
  try {

    const {rows: [card]} = await client.query(`
    INSERT INTO cards(name, image, set, "numberInSet", rarity, version, "cardType", type, "hitPoints", artist) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *;
    `, [ name, image, set, numberInSet, rarity, version, cardType, type, hitPoints, artist ]);

    return card;
  } catch (error) {
    throw error;
  }
}

async function deleteCard(id) {
  try {

    const {rows: [card]} = await client.query(`
    DELETE FROM cards
    WHERE id=$1
    RETURNING id, name;
    `, [id]);

    return card;
  } catch (error) {
    throw error;
  }
}

async function updateCard({columnsToUpdate, id}) {
  try {

    const columns = [];
    const values = [];
    let i = 1;

    columnsToUpdate.forEach((columnToUpdate) => {
      if(
        columnToUpdate.column === 'name' ||
        columnToUpdate.column === 'image' ||
        columnToUpdate.column === 'set' ||
        columnToUpdate.column === 'numberInSet' ||
        columnToUpdate.column === 'rarity' ||
        columnToUpdate.column === 'version' ||
        columnToUpdate.column === 'cardType' ||
        columnToUpdate.column === 'type' ||
        columnToUpdate.column === 'hitPoints' ||
        columnToUpdate.column === 'artist'
      ){
        columns.push(` "${columnToUpdate.column}"=$${i} `);
        values.push(columnToUpdate.value);
        i++;
      }
    });

    values.push(id);

    if(columns.length > 0){

      const {rows: [card]} = await client.query(`
      UPDATE cards
      SET ${columns}
      WHERE id=$${i}
      RETURNING *;
      `, values);
      return card;
    }

    return 'There are no columns to update.';
  } catch (error) {
    throw error;
  }
}

async function getCardById(id) {
  try {

    const {rows: [card]} = await client.query(`
    SELECT *
    FROM cards
    WHERE id=$1;
    `, [id]);

    return card;
  } catch (error) {
    throw error;
  }
}

async function getCardByName(name) {
  try {

    const {rows: [card]} = await client.query(`
    SELECT *
    FROM cards
    WHERE name=$1;
    `, [name]);

    return card;
  } catch (error) {
    throw error;
  }
}

async function getAllCards() {
  try {

    const {rows: cards} = await client.query(`
    SELECT *
    FROM cards;
    `);

    return cards;
  } catch (error) {
    throw error;
  }
}

// just put all of these in a search function?
// get all cards for set
// get all cards by artist

module.exports = {
  createCard,
  deleteCard,
  updateCard,
  getCardById,
  getCardByName,
  getAllCards
}
