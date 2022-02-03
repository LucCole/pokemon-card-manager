
const express = require('express');
const collectionsRouter = express.Router();

const { 
  createCollection,
  deleteCollection,
  updateCollection,
  getCollectionById,
  getCollectionByName,
  getAllCollections,
  canAccessCollection,
  deleteAllCollectionsCards,
  getAllUserCollections
} = require('../db');

// POST /api/collections
collectionsRouter.post('/', async (req, res, next) => {
  try {
    const collectionTemplate = await createCollection({...req.body, userId : req.user.id});
    res.send(collectionTemplate);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/collections/:id
collectionsRouter.delete('/:id', async (req, res, next) => {
  try {
    
    const collectionId = req.params.id;
    const doesCollectionExist = await getCollectionById(collectionId);

    if(!doesCollectionExist){
      next({
        name: 'NotFound',
        message: `No collection found by ID ${collectionId}`
      })
    }else{

      const canAccess = await canAccessCollection(collectionId, req.user.id);

      if(canAccess){
        await deleteAllCollectionsCards(collectionId);
        const collection = await deleteCollection(collectionId);
        res.send(collection);
      }else{
        next({
          name: 'CantAccess',
          message: `You do not have access this collection`
        })
      }
    }
  } catch (error) {
    next(error);
  }
});

// PATCH /api/collections/:id
collectionsRouter.patch('/:id', async (req, res, next) => {
  try {

    const collectionId = req.params.id;
    const doesCollectionExist = await getCollectionById(collectionId);

    if(!doesCollectionExist){
      next({
        name: 'NotFound',
        message: `No collection found by ID ${collectionId}`
      })
    }else{

      const canAccess = await canAccessCollection(collectionId, req.user.id);

      if(canAccess){
        const collection = await updateCollection({...req.body, id: req.params.id});
        res.send(collection);
      }else{
        next({
          name: 'CantAccess',
          message: `You do not have access this collection`
        })
      }
    }
  } catch (error) {
    next(error);
  }
});

// GET /api/collections/id/:id
collectionsRouter.get('/id/:id', async (req, res, next) => {
  try {

    const collectionId = req.params.id;
    const collection = await getCollectionById(collectionId);

    if(!collection){
      next({
        name: 'NotFound',
        message: `No collection found by ID ${collectionId}`
      })
    }else{

      const canAccess = await canAccessCollection(collectionId, req.user.id);

      if(canAccess){
        res.send(collection);
      }else{
        next({
          name: 'CantAccess',
          message: `You do not have access this collection`
        })
      }
    }
  } catch (error) {
    next(error);
  }
});

// GET /api/collections/name/:name
collectionsRouter.get('/name/:name', async (req, res, next) => {
  try {

    const collectionName = req.params.name;
    const collection = await getCollectionByName(collectionName);

    if(!collection){
      next({
        name: 'NotFound',
        message: `No collection found by Name ${collectionName}`
      })
    }else{

      const canAccess = await canAccessCollection(collection.id, req.user.id);

      if(canAccess){
        res.send(collection);
      }else{
        next({
          name: 'CantAccess',
          message: `You do not have access this collection`
        })
      }
    }
  } catch (error) {
    next(error);
  }
});

// GET /api/collections/user
collectionsRouter.get('/user', async (req, res, next) => {
  try {
    const collections = await getAllUserCollections(req.user.id);
    res.send(collections);
  } catch (error) {
    next(error);
  }
});






// !! DEV !!
// GET /api/collections
collectionsRouter.get('/', async (req, res, next) => {
  try {
    const collections = await getAllCollections();
    res.send(collections);
  } catch (error) {
    next(error);
  }
});

module.exports = collectionsRouter;
