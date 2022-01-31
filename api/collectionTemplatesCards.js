// TODO 

/* 

- some of these need to require an admin user (post, delete, update)

*/

const express = require('express');
const collectionTemplateCardsRouter = express.Router();

const { 
  createCollectionTemplateCard,
  deleteCollectionTemplateCard,
  getCollectionTemplateCardById
} = require('../db');

// POST /api/collectiontemplates-cards
collectionTemplateCardsRouter.post('/', async (req, res, next) => {
  try {
    const collectionTemplateCard = await createCollectionTemplateCard(req.body);
    res.send(collectionTemplateCard);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/collectiontemplates-cards/:id
collectionTemplateCardsRouter.delete('/:id', async (req, res, next) => {
  console.log(req.params.id);
  try {
    const collectionTemplateCard = await deleteCollectionTemplateCard(req.params.id);
    res.send(collectionTemplateCard);
  } catch (error) {
    next(error);
  }
});

// GET /api/collectiontemplates-cards/id/:id
collectionTemplateCardsRouter.get('/id/:id', async (req, res, next) => {
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

module.exports = collectionTemplateCardsRouter;
