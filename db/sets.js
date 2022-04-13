
const { client } = require('./client');


const { 
  getCardsBySet
} = require('../db/cards.js');


//series, 
// admin and super admin only
async function createSet({ name, logo, icon, releaseDate, cards, normalCards, secretCards }) {
  try {

    //series, 
    //series, 
    const {rows: [set]} = await client.query(`
    INSERT INTO sets(name, logo, icon, "releaseDate", cards, "normalCards", "secretCards") 
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `, [name, logo, icon, releaseDate, cards, normalCards, secretCards ]);

    return set;
  } catch (error) {
    throw error;
  }
}

// admin and super admin only
async function deleteSet(id) {
  try {

    const {rows: [set]} = await client.query(`
    DELETE FROM sets
    WHERE id=$1
    RETURNING id, name;
    `, [id]);

    return set;
  } catch (error) {
    throw error;
  }
}

// admin and super admin only
async function updateSet({columnsToUpdate, id}) {
  try {

    const columns = [];
    const values = [];
    let i = 1;
    // columnToUpdate.column === 'series' ||
    columnsToUpdate.forEach((columnToUpdate) => {
      if(
        columnToUpdate.column === 'name' ||
        columnToUpdate.column === 'logo' ||
        columnToUpdate.column === 'icon' ||
        columnToUpdate.column === 'logo' ||
        columnToUpdate.column === 'releaseDate' ||
        columnToUpdate.column === 'normalCards' ||
        columnToUpdate.column === 'secretCards'
      ){
        columns.push(` "${columnToUpdate.column}"=$${i} `);
        values.push(columnToUpdate.value);
        i++;
      }
    });

    values.push(id);

    if(columns.length > 0){

      const {rows: [sets]} = await client.query(`
      UPDATE sets
      SET ${columns}
      WHERE id=$${i}
      RETURNING *;
      `, values);
      return sets;
    }

    return 'There are no columns to update.';
  } catch (error) {
    throw error;
  }
}

// For these 3, do I need to bring in all cards for the set here?
// How do I do this?
// should I pass in a bool? That migh be the easiest way. Default to false.

// anyone
async function getSetById(id) {
  try {

    const {rows: [set]} = await client.query(`
    SELECT sets.*
    FROM sets
    WHERE sets.id=$1;
    `, [id]);
    
    set.cardList = await getCardsBySet(id);

    return set;
  } catch (error) {
    throw error;
  }
}

// anyone
async function getSetByName(command) {
  try {

    const {rows: [set]} = await client.query(`
    SELECT *
    FROM sets
    WHERE name=$1;
    `, [command]);

    return set;
  } catch (error) {
    throw error;
  }
}

// anyone
async function getAllSets() {
  try {

    const {rows: sets} = await client.query(`
    SELECT *
    FROM sets;
    `);

    return sets;
  } catch (error) {
    throw error;
  }
}



async function getAllSetsSnippet() {
  try {

    const {rows: sets} = await client.query(`
    SELECT id, name
    FROM sets;
    `);

    return sets;
  } catch (error) {
    throw error;
  }
}

// anyone
// async function getSetsBySeries(series) {
//   try {

//     const whereArr = [];

//     series.forEach((series, index) => {
//       whereArr.push(` series=$${index+1} `);
//     });

//     if(whereArr.length > 0){

//       const where = whereArr.join('OR');

//       const {rows: sets} = await client.query(`
//       SELECT *
//       FROM sets
//       WHERE ${where};
//       `, series);

//       return sets;
//     }

//     return 'There are no series to search for.';

//   } catch (error) {
//     throw error;
//   }
// }

module.exports = {
  createSet,
  deleteSet,
  updateSet,
  getSetById,
  getSetByName,
  getAllSets
  // getSetsBySeries
}
