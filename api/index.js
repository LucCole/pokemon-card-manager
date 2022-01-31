const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const {
  getUserById
} = require('../db');

apiRouter.use(async (req, res, next) => {

  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) {
      next();
  } else if (auth.startsWith(prefix)) {

      const token = auth.slice(prefix.length);

      try {
          const { id } = jwt.verify(token, JWT_SECRET);
          if (id) {
              req.user = await getUserById(id);
              next();
          }  
      } catch (error) {
          next(error);
      }
  } else {
      next({
          name: 'AuthorizationHeaderError',
          message: `Authorization token must start with ${ prefix }`
      });
  }
});

apiRouter.get('/health', async (req, res, next) =>{
  try{
      res.send({message: "API Healthy"});
  }catch(error){
      next(error);
  }
});

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const setsRouter = require('./sets');
apiRouter.use('/sets', setsRouter);

const cardsRouter = require('./cards');
apiRouter.use('/cards', cardsRouter);

// doesnt this need to be the same case as the file name?
const collectionTemplatesRouter = require('./collectionTemplates');
apiRouter.use('/collectiontemplates', collectionTemplatesRouter);

const collectionTemplatesCardsRouter = require('./collectionTemplatesCards');
apiRouter.use('/collection-templates-cards', collectionTemplatesCardsRouter);

const collectionsRouter = require('./collections');
apiRouter.use('/collections', collectionsRouter);

const collectionsCardsRouter = require('./collectionsCards');
apiRouter.use('/collections-cards', collectionsCardsRouter);

module.exports = apiRouter
