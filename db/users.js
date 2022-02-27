const { client }= require('./client');
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

// anyone (do i need to make sure there isnt a super admin already? like if 1 super admin the superAdmin = false even if they ask for it to be true? this way the only super admin would be in the seed data)
async function createUser({ username, password, email, admin = false, superAdmin = false}) {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

  try {
    console.log('before query');
    const {rows: [user]} = await client.query(`
    INSERT INTO users(username, password, email, admin, "superAdmin") 
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (username, email) DO NOTHING 
    RETURNING id, username, email;
    `, [username, hashedPassword, email, admin, superAdmin]);
    console.log('After query, User:', user);
    return user;
  } catch (error) {
    throw error;
  }
}

// user only
async function updateUser({columnsToUpdate, id}) {
  console.log('columnsToUpdate:', columnsToUpdate);
  console.log('id: ', id);
  try {

    const columns = [];
    const values = [];
    let i = 1;

    columnsToUpdate.forEach((columnToUpdate) => {
      if(
        columnToUpdate.column === 'username' ||
        columnToUpdate.column === 'password' ||
        columnToUpdate.column === 'email'
      ){
        columns.push(` "${columnToUpdate.column}"=$${i} `);
        values.push(columnToUpdate.value);
        i++;
      }
    });

    values.push(id);

    if(columns.length > 0){

      const {rows: [User]} = await client.query(`
      UPDATE users
      SET ${columns}
      WHERE id=$${i}
      RETURNING *;
      `, values);
      return User;
    }

    return 'There are no compatible columns to update.';

  } catch (error) {
    throw error;
  }
}

// user only
async function deleteUser(id) {
  try {
    const {rows: [User]} = await client.query(`
    DELETE FROM users
    WHERE id=$1
    RETURNING id, username;
    `, [id]);
    return duty;
  } catch (error) {
    throw error;
  }
}

// anyone (i think?)
async function getUserByUsername(userName) {
  try {
    const {rows: [ user ] } = await client.query(`
    SELECT id, username, password, email, admin, "superAdmin"
    FROM users
    WHERE username = $1;
    `, [userName]);

  if (!user) return null;

  return user;
  } catch (error) {
  console.error(error)
  }
}

// anyone (i think?)
async function getUserById(userId) {
  try {
    const {rows: [user]} = await client.query(`
    SELECT id, username, email, admin, "superAdmin"
    FROM users
    WHERE id = $1;
    `, [userId]);

    if (!user) return null;
    return user;  
  } catch (error) {
      throw error;
  }
}

// anyone
async function getUser({username, password}) {
  if (!username || !password) {
    return;
  }

  try {
    const user = await getUserByUsername(username);
    if(!user) return;

    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);

    if(!passwordsMatch) return;

    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}



// changeAdminStatus ---- ONLY super admin may do this





module.exports = {
    createUser,
    deleteUser,
    updateUser,
    getUser,
    getUserByUsername,
    getUserById
}
