// TODO 

/* 

- some of these need to require an admin user (post, delete, update)

*/

const express = require('express');
const collectionsCardsRouter = express.Router();

const { 
  createCollectionCard,
  deleteCollectionCard,
  getCollectionCardById
} = require('../db');

// POST /api/collections-cards
collectionsCardsRouter.post('/', async (req, res, next) => {
  try {
    const collectionTemplateCard = await createCollectionCard(req.body);
    res.send(collectionTemplateCard);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/collections-cards/:id
collectionsCardsRouter.delete('/:id', async (req, res, next) => {
  console.log(req.params.id);
  try {
    const collectionTemplateCard = await deleteCollectionCard(req.params.id);
    res.send(collectionTemplateCard);
  } catch (error) {
    next(error);
  }
});

// GET /api/collections-cards/id/:id
collectionsCardsRouter.get('/id/:id', async (req, res, next) => {
  try {
    const collectionTemplateCard = await getCollectionCardById(req.params.id);
    if(typeof collectionTemplateCard === 'object'){
      res.send(collectionTemplateCard);
    }else{
      res.send({
        error:'Inncorect Id',
        message: "There is no collection template card with that id"
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = collectionsCardsRouter;
