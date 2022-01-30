
const express = require('express');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const { requireUser } = require('./middleware');

const { 
  createUser,
  getUserByUsername,
  getUser,
  getUserById,
  updateUser
} = require('../db'); 

const { JWT_SECRET } = process.env;

// POST /api/users/register
userRouter.post('/register', async (req, res, next) => {
  console.log('register');
  try {
    const {username, email, password} = req.body;
    const queriedUser = await getUserByUsername(username);
    if (queriedUser) {
      res.status(401);
      next({
        name: 'UserExistsError',
        message: 'A user by that username already exists'
      });
    } else if (password.length < 8) {
      res.status(401);
      next({
        name: 'PasswordLengthError',
        message: 'Password Too Short! Must be 8 characters or longer'
      });
    } else {
      const user = await createUser({
        username,
        email,
        password
      });
      if (!user) {
        next({
          name: 'UserCreationError',
          message: 'There was a problem registering you. Please try again.',
        });
      } else {
        const token = jwt.sign({id: user.id, username: user.username}, JWT_SECRET, { expiresIn: '1w' });
        res.send({ user, message: "you're signed up!", token });
      }
    }
  } catch (error) {
    next(error)
  }
});

// This was a POST, but I realized I couldnt see why. So I'm trying it as a get.
// GET /api/users/login
userRouter.get('/login', async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({
      name: 'MissingCredentialsError',
      message: 'Please supply both a username and password'
    });
  }

  try {
    const user = await getUser({username, password});
    if(!user) {
      next({
        name: 'IncorrectCredentialsError',
        message: 'Username or password is incorrect',
      })
    } else {
      const token = jwt.sign({id: user.id, username: user.username}, JWT_SECRET, { expiresIn: '1w' });
      res.send({ user, username, message: "you're logged in!", token });
    }
  } catch (error) {
    next(error);
  }
});

// We need to make sure that only the user that can be changed is the one thats currently logged in

// PATCH /api/users/me/:userId
userRouter.patch('/me/:userId', requireUser, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await getUserById(userId);

    // console.log('user.id: ', user.id);
    // console.log('req.user.id: ', req.user.id);
    if(!user) {
      next({
        name: 'No User',
        message: `There is no user with the id of ${userId}`
      });
    } else if(req.user && user.id === req.user.id) {
      req.body.id = req.user.id;
      const user = await updateUser(req.body);
      res.send(user);
    }else{
      next();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;