// TODO 

/* 

- some of these need to require an admin user (post, delete, update)

*/

const express = require('express');
const collectionTemplatesRouter = express.Router();

const { 
  createCollectionTemplate,
  deleteCollectionTemplate,
  updateCollectionTemplate,
  getCollectionTemplateById,
  getCollectionTemplateByName,
  getAllCollectionTemplates
} = require('../db');

// POST /api/collectiontemplates
collectionTemplatesRouter.post('/', async (req, res, next) => {
  try {
    const collectionTemplate = await createCollectionTemplate(req.body);
    res.send(collectionTemplate);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/collectiontemplates/:id
collectionTemplatesRouter.delete('/:id', async (req, res, next) => {
  console.log(req.params.id);
  try {
    const collectionTemplate = await deleteCollectionTemplate(req.params.id);
    res.send(collectionTemplate);
  } catch (error) {
    next(error);
  }
});

// PATCH /api/collectiontemplates/:id
collectionTemplatesRouter.patch('/:id', async (req, res, next) => {
  try {
    const collectionTemplate = await updateCollectionTemplate({...req.body, id: req.params.id});
    res.send(collectionTemplate);
  } catch (error) {
    next(error);
  }
});

// GET /api/collectiontemplates/id/:id
collectionTemplatesRouter.get('/id/:id', async (req, res, next) => {
  try {
    const collectionTemplate = await getCollectionTemplateById(req.params.id);
    if(typeof collectionTemplate === 'object'){
      res.send(collectionTemplate);
    }else{
      res.send({
        error:'Inncorect Id',
        message: "There is no collection template with that id"
      });
    }
  } catch (error) {
    next(error);
  }
});

// GET /api/collectiontemplates/name/:name
collectionTemplatesRouter.get('/name/:name', async (req, res, next) => {
  try {
    const collectionTemplate = await getCollectionTemplateByName(req.params.name);
    if(typeof collectionTemplate === 'object'){
      res.send(collectionTemplate);
    }else{
      res.send({
        error:'Inncorect name',
        message: `There is no collection template named ${req.params.name}`
      });
    }
  } catch (error) {
    next(error);
  }
});

// GET /api/collectiontemplates
collectionTemplatesRouter.get('/', async (req, res, next) => {
  try {
    const collectionTemplates = await getAllCollectionTemplates();
    res.send(collectionTemplates);
  } catch (error) {
    next(error);
  }
});

module.exports = collectionTemplatesRouter;
