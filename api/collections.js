// TODO 

/* 

- some of these need to require an admin user (post, delete, update)

*/

const express = require('express');
const collectionsRouter = express.Router();

const { 
  createCollection,
  deleteCollection,
  updateCollection,
  getCollectionById,
  getCollectionByName,
  getAllCollections
} = require('../db');

// POST /api/collections
collectionsRouter.post('/', async (req, res, next) => {
  try {
    const collectionTemplate = await createCollection(req.body);
    res.send(collectionTemplate);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/collections/:id
collectionsRouter.delete('/:id', async (req, res, next) => {
  console.log(req.params.id);
  try {
    const collectionTemplate = await deleteCollection(req.params.id);
    res.send(collectionTemplate);
  } catch (error) {
    next(error);
  }
});

// PATCH /api/collections/:id
collectionsRouter.patch('/:id', async (req, res, next) => {
  try {
    const collectionTemplate = await updateCollection({...req.body, id: req.params.id});
    res.send(collectionTemplate);
  } catch (error) {
    next(error);
  }
});

// GET /api/collections/id/:id
collectionsRouter.get('/id/:id', async (req, res, next) => {
  try {
    const collectionTemplate = await getCollectionById(req.params.id);
    if(typeof collectionTemplate === 'object'){
      res.send(collectionTemplate);
    }else{
      res.send({
        error:'Inncorect Id',
        message: "There is no collection with that id"
      });
    }
  } catch (error) {
    next(error);
  }
});

// GET /api/collections/name/:name
collectionsRouter.get('/name/:name', async (req, res, next) => {
  try {
    const collection = await getCollectionByName(req.params.name);
    if(typeof collection === 'object'){
      res.send(collection);
    }else{
      res.send({
        error:'Inncorect name',
        message: `There is no collection named ${req.params.name}`
      });
    }
  } catch (error) {
    next(error);
  }
});

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
