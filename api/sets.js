
const express = require('express');
const setsRouter = express.Router();

const { 
  createSet,
  deleteSet,
  updateSet,
  getSetById,
  getSetByName,
  getAllSets,
  getSetsBySeries
} = require('../db'); 

// POST /api/sets
setsRouter.post('/', async (req, res, next) => {
  try {
    const set = await createSet(req.body);
    res.send(set);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/sets/:id
setsRouter.delete('/:id', async (req, res, next) => {
  console.log(req.params.id);
  try {
    const set = await deleteSet(req.params.id);
    res.send(set);
  } catch (error) {
    next(error);
  }
});

// PATCH /api/sets
setsRouter.patch('/:id', async (req, res, next) => {
  try {
    const set = await updateSet({...req.body, id: req.params.id});
    res.send(set);
  } catch (error) {
    next(error);
  }
});

// GET /api/sets/id/:id
setsRouter.get('/id/:id', async (req, res, next) => {
  try {
    const set = await getSetById(req.params.id);
    if(typeof set === 'object'){
      res.send(set);
    }else{
      res.send({
        error:'Inncorect Id',
        message: "There is no set with that id"
      });
    }
  } catch (error) {
    next(error);
  }
});

// GET /api/sets/name/:name
setsRouter.get('/name/:name', async (req, res, next) => {
  try {
    const set = await getSetByName(req.params.name);
    if(typeof set === 'object'){
      res.send(set);
    }else{
      res.send({
        error:'Inncorect name',
        message: `There is no set named ${req.params.name}`
      });
    }
  } catch (error) {
    next(error);
  }
});

// GET /api/sets
setsRouter.get('/', async (req, res, next) => {
  try {
    const sets = await getAllSets();
    res.send(sets);
  } catch (error) {
    next(error);
  }
});

// GET /api/sets/snippet
setsRouter.get('/', async (req, res, next) => {
  try {
    const sets = await getAllSetsSnippet();
    res.send(sets);
  } catch (error) {
    next(error);
  }
});

// // GET /api/sets/series
// setsRouter.get('/series', async (req, res, next) => {
//   try {
//     if(!"series" in req.body){
//       res.send('No series series in body.');
//     }else if(req.body.series.length === 0){
//       res.send('No series sent.');
//     }
//     const sets = await getSetsBySeries(req.body.series);
//     res.send(sets);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = setsRouter;
