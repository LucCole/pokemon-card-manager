
const { client } = require('./client');

// typeNormal, typeHollo, typeReverseHollo, typeFoil,
// admin and super admin only
async function createCard({ name, image, set, number, rarity, artist }) {
  // console.log('number: ', number);
  try {

    //"typeNormal", "typeHollo", "typeReverseHollo", "typeFoil"

    //typeNormal, typeHollo, typeReverseHollo, typeFoil

    const {rows: [card]} = await client.query(`
    INSERT INTO cards(name, image, set, number, rarity, artist) 
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `, [ name, image, set, number, rarity, artist ]);

    return card;
  } catch (error) {
    throw error;
  }
}

// admin and super admin only
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

// admin and super admin only
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
        // columnToUpdate.column === 'numberInSet' ||
        columnToUpdate.column === 'rarity' ||
        // columnToUpdate.column === 'typeNormal' ||
        // columnToUpdate.column === 'typeHollo' ||
        // columnToUpdate.column === 'typeReverseHollo' ||
        // columnToUpdate.column === 'typeFoil' ||
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
    SELECT cards.*, sets.cards AS "setCards"
    FROM cards
    JOIN sets ON cards.set = sets.id
    WHERE cards.id=$1;
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
    SELECT cards.*, sets.name AS "setName", sets.cards AS "setCards"
    FROM cards
    JOIN sets ON cards.set = sets.id;
    `);

    return cards;
  } catch (error) {
    throw error;
  }
}



async function getCardsBySet(set) {
  try {

    const {rows: cards} = await client.query(`
    SELECT *
    FROM cards
    WHERE cards.set = $1
    `, [set]);

    return cards;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createCard,
  deleteCard,
  updateCard,
  getCardById,
  getCardByName,
  getAllCards,
  getCardsBySet
}
