
const express = require('express');
const collectionTemplatesRouter = express.Router();

// to remove
const { performance } = require('perf_hooks');

const { 
  createCollectionTemplate,
  deleteCollectionTemplate,
  updateCollectionTemplate,
  getCollectionTemplateById,
  getCollectionTemplateByName,
  getAllCollectionTemplates,
  canAccessCollectionTemplate,
  deleteAllCollectionTemplateCards,
  getAllUserCollectionTemplates,
  getAllCardsForCollectionTemplate,
  createCollectionCard,
  createCollection
} = require('../db');

// POST /api/collection-templates
collectionTemplatesRouter.post('/', async (req, res, next) => {
  try {
    console.log('req.user: ', req.user);
    const collectionTemplate = await createCollectionTemplate({...req.body, creatorId : req.user.id});
    res.send(collectionTemplate);
  } catch (error) {
    next(error);
  }
});

// PATCH /api/collection-templates/:id
collectionTemplatesRouter.patch('/:id', async (req, res, next) => {
  try {

    const collectionTemplateId = req.params.id;
    const doesCollectionTemplateExist = await getCollectionTemplateById(collectionTemplateId);

    if(!doesCollectionTemplateExist){
      next({
        name: 'NotFound',
        message: `No collection found by ID ${collectionTemplateId}`
      })
    }else{

      const canAccess = await canAccessCollectionTemplate(collectionTemplateId, req.user.id);

      if(canAccess){
        const collectionTemplate = await updateCollectionTemplate({...req.body, id: req.params.id});
        res.send(collectionTemplate);
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

// DELETE /api/collection-templates/:id
collectionTemplatesRouter.delete('/:id', async (req, res, next) => {
  try {

    const collectionTemplateId = req.params.id;
    const doesCollectionTemplateExist = await getCollectionTemplateById(collectionTemplateId);

    if(!doesCollectionTemplateExist){
      next({
        name: 'NotFound',
        message: `No collection found by ID ${collectionTemplateId}`
      })
    }else{

      const canAccess = await canAccessCollectionTemplate(collectionTemplateId, req.user.id);

      if(canAccess){
        await deleteAllCollectionTemplateCards(collectionTemplateId);
        
        const collectionTemplate = await deleteCollectionTemplate(collectionTemplateId);

        res.send(collectionTemplate);
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

// GET /api/collection-templates/id/:id
collectionTemplatesRouter.get('/id/:id', async (req, res, next) => {
  try {

    const collectionId = req.params.id;
    const collectionTemplate = await getCollectionTemplateById(collectionId);

    if(!collectionTemplate){
      next({
        name: 'NotFound',
        message: `No collection template found by ID ${collectionId}`
      })
    }else{
      collectionTemplate.cards = await getAllCardsForCollectionTemplate(collectionTemplate.id);
      res.send(collectionTemplate);
    }

  } catch (error) {
    next(error);
  }
});


// !! FOR MY TEMPLATES (user)
// GET /api/collection-templates/id/:id
collectionTemplatesRouter.get('/me/id/:id', async (req, res, next) => {
  try {

    const collectionId = req.params.id;
    const collectionTemplate = await getCollectionTemplateById(collectionId);

    if(!collectionTemplate){
      next({
        name: 'NotFound',
        message: `No collection template found by ID ${collectionId}`
      })
    }else{

      collectionTemplate.cards = await getAllCardsForCollectionTemplate(collectionTemplate.id);

      const canAccess = await canAccessCollectionTemplate(collectionId, req.user.id);

      if(canAccess){
        res.send(collectionTemplate);
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

// GET /api/collection-templates/name/:name
collectionTemplatesRouter.get('/name/:name', async (req, res, next) => {
  try {

    const collectionTemplateName = req.params.name;
    const collectionTemplate = await getCollectionTemplateByName(collectionTemplateName);

    if(!collectionTemplate){
      next({
        name: 'NotFound',
        message: `No collection template found by Name ${collectionTemplateName}`
      })
    }else{

      const canAccess = await canAccessCollectionTemplate(collectionTemplate.id, req.user.id);

      if(canAccess){
        res.send(collectionTemplate);
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

// GET /api/collections-templates/user/:id
collectionTemplatesRouter.get('/user/:id', async (req, res, next) => {
  try {
    const collectionTemplates = await getAllUserCollectionTemplates(req.params.id);
    res.send(collectionTemplates);
  } catch (error) {
    next(error);
  }
});

// GET /api/collections-templates/user
collectionTemplatesRouter.get('/user', async (req, res, next) => {
  try {
    const collectionTemplates = await getAllUserCollectionTemplates(req.user.id);
    res.send(collectionTemplates);
  } catch (error) {
    next(error);
  }
});

// GET /api/collection-templates
collectionTemplatesRouter.get('/', async (req, res, next) => {
  try {
    const collectionTemplates = await getAllCollectionTemplates();
    res.send(collectionTemplates);
  } catch (error) {
    next(error);
  }
});









// POST /api/collection-templates/into-collection/:id
collectionTemplatesRouter.post('/into-collection/:id', async (req, res, next) => {
  try {

    const collectionId = req.params.id;
    const collectionTemplate = await getCollectionTemplateById(collectionId);

    if(!collectionTemplate){
      next({
        name: 'NotFound',
        message: `No collection template found by ID ${collectionId}`
      })
    }else{

      const collection = await createCollection({...collectionTemplate, userId : req.user.id});

      collectionTemplate.cards = await getAllCardsForCollectionTemplate(collectionTemplate.id);
      
      collectionTemplate.cards.forEach(async (card) => {

        console.log('---------- card');
        console.log(card);

        const temp = await createCollectionCard({
          collectionId: collection.id, 
          cardId: card.id, 
          collected: false
        });

        console.log('temp', temp);
      });

      res.send(collection);
    }

  } catch (error) {
    next(error);
  }
});






module.exports = collectionTemplatesRouter;
