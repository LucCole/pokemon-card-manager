
const { client } = require('./client');

// admin and super admin only
async function createSet({ name, series, logo, numberOfCards, normalCards, secretCards }) {
  try {

    const {rows: [set]} = await client.query(`
    INSERT INTO sets(name, series, logo, "numberOfCards", "normalCards", "secretCards") 
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `, [name, series, logo, numberOfCards, normalCards, secretCards ]);

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

    columnsToUpdate.forEach((columnToUpdate) => {
      if(
        columnToUpdate.column === 'name' ||
        columnToUpdate.column === 'series' ||
        columnToUpdate.column === 'logo' ||
        columnToUpdate.column === 'numberOfCards' ||
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
async function getSetyById(id) {
  try {

    const {rows: [set]} = await client.query(`
    SELECT *
    FROM sets
    WHERE id=$1;
    `, [id]);

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

// anyone
async function getSetsBySeries(series) {
  try {

    const whereArr = [];

    series.forEach((series, index) => {
      whereArr.push(` series=$${index+1} `);
    });

    if(whereArr.length > 0){

      const where = whereArr.join('OR');

      const {rows: sets} = await client.query(`
      SELECT *
      FROM sets
      WHERE ${where};
      `, series);

      return sets;
    }

    return 'There are no series to search for.';

  } catch (error) {
    throw error;
  }
}

module.exports = {
  createSet,
  deleteSet,
  updateSet,
  getSetyById,
  getSetByName,
  getAllSets,
  getSetsBySeries
}
