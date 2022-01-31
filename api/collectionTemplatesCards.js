
const express = require('express');
const collectionTemplatesCardsRouter = express.Router();

const { 
  createCollectionTemplateCard,
  deleteCollectionTemplateCard,
  getCollectionTemplateCardById
} = require('../db');

// POST /api/collection-templates-cards
collectionTemplatesCardsRouter.post('/', async (req, res, next) => {
  try {
    const collectionTemplateCard = await createCollectionTemplateCard(req.body);
    res.send(collectionTemplateCard);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/collection-templates-cards/:id
collectionTemplatesCardsRouter.delete('/:id', async (req, res, next) => {
  console.log(req.params.id);
  try {
    const collectionTemplateCard = await deleteCollectionTemplateCard(req.params.id);
    res.send(collectionTemplateCard);
  } catch (error) {
    next(error);
  }
});

// GET /api/collection-templates-cards/id/:id
collectionTemplatesCardsRouter.get('/id/:id', async (req, res, next) => {
  try {
    const collectionTemplateCard = await getCollectionTemplateCardById(req.params.id);
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

module.exports = collectionTemplatesCardsRouter;
