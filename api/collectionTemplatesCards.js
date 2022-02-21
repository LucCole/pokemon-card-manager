
const express = require('express');
const collectionTemplatesCardsRouter = express.Router();

const { 
  createCollectionTemplateCard,
  deleteCollectionTemplateCard,
  getCollectionTemplateCardById,
  getCardById,
  canAccessCollectionTemplate
} = require('../db');

// POST /api/collection-templates-cards
collectionTemplatesCardsRouter.post('/', async (req, res, next) => {
  try {

    const collectionTemplateId = req.body.collectionTemplateId;
    const collectionTemplate = await getCollectionTemplateCardById(collectionTemplateId);

    const cardId = req.body.cardId;
    const card = await getCardById(cardId);

    if(!collectionTemplate){
      next({
        name: 'NotFound',
        message: `No collection template found by ID ${collectionTemplateId}`
      })
    }else if(!card){
      next({
        name: 'NotFound',
        message: `No card found by ID ${cardId}`
      })
    }else{

      const canAccess = await canAccessCollectionTemplate(collectionTemplateId, req.user.id);

      if(canAccess){
        const collectionTemplateCard = await createCollectionTemplateCard(req.body);
        res.send(collectionTemplateCard);
      }else{
        next({
          name: 'CantAccess',
          message: `You do not have access this collection template`
        })
      }
    }

  } catch (error) {
    next(error);
  }
});

// DELETE /api/collection-templates-cards/:id
collectionTemplatesCardsRouter.delete('/:id', async (req, res, next) => {
  try {

    const collectionTemplateCardId = req.body.collectionCardId;
    const collectionTemplateCard = await getCollectionTemplateCardById(collectionCardId);

    if(!collectionTemplateCard){
      next({
        name: 'NotFound',
        message: `No collection template card found by ID ${collectionTemplateCardId}`
      })
    }else{

      const canAccess = await canAccessCollectionTemplate(collectionTemplateCard.collectionTemplateId, req.user.id);

      if(canAccess){
        const collectionTemplateCard = await deleteCollectionTemplateCard(collectionTemplateCardId);
        res.send(collectionTemplateCard);
      }else{
        next({
          name: 'CantAccess',
          message: `You do not have access this collection template`
        })
      }
    }

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
