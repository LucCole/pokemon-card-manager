
const express = require('express');
const collectionsCardsRouter = express.Router();

const { 
  createCollectionCard,
  deleteCollectionCard,
  getCollectionCardById,
  getCardById,
  getCollectionById,
  canAccessCollection,
  updateCardCollectedStatus

} = require('../db');

// POST /api/collections-cards
collectionsCardsRouter.post('/', async (req, res, next) => {
  try {

    const collectionId = req.body.collectionId;
    const collection = await getCollectionById(collectionId);

    const cardId = req.body.cardId;
    const card = await getCardById(cardId);

    if(!collection){
      next({
        name: 'NotFound',
        message: `No collection found by ID ${collectionId}`
      })
    }else if(!card){
      next({
        name: 'NotFound',
        message: `No card found by ID ${cardId}`
      })
    }else{

      const canAccess = await canAccessCollection(collectionId, req.user.id);

      if(canAccess){
        const collectionCard = await createCollectionCard(req.body);
        res.send(collectionCard);
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

// DELETE /api/collections-cards
collectionsCardsRouter.delete('/', async (req, res, next) => {
  try {

    const collectionCardId = req.body.collectionCardId;
    const collectionCard = await getCollectionCardById(collectionCardId);

    if(!collectionCard){
      next({
        name: 'NotFound',
        message: `No collection card found by ID ${collectionCardId}`
      })
    }else{

      const canAccess = await canAccessCollection(collectionCard.collectionId, req.user.id);

      if(canAccess){
        const collectionCard = await deleteCollectionCard(collectionCardId);
        res.send(collectionCard);
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

// PATCH /api/collections-cards/collection-status
collectionsCardsRouter.patch('/collection-status', async (req, res, next) => {
  try {

    const collectionCardId = req.body.collectionCardId;
    const collectionCard = await getCollectionCardById(collectionCardId);

    if(!collectionCard){
      next({
        name: 'NotFound',
        message: `No collection card found by ID ${collectionCardId}`
      })
    }else{

      const canAccess = await canAccessCollection(collectionCard.collectionId, req.user.id);

      if(canAccess){
        const updatedCollectionCard = await updateCardCollectedStatus({...collectionCard, collected: req.body.collected});
        res.send(updatedCollectionCard);
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

// ?? needed ?? DEV?
// GET /api/collections-cards/id/:id
collectionsCardsRouter.get('/id/:id', async (req, res, next) => {
  try {
    const collectionCard = await getCollectionCardById(req.params.id);
    if(collectionCard){
      res.send(collectionCard);
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
