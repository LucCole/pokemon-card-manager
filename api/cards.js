// TODO 

/* 

- some of these need to require an admin user (post, delete, update)

*/

const express = require('express');
const cardsRouter = express.Router();

const { 
  createCard,
  deleteCard,
  updateCard,
  getCardById,
  getCardByName,
  getAllCards,
} = require('../db');

cardsRouter.post('/', async (req, res, next) => {
  try {
    const card = await createCard(req.body);
    res.send(card);
  } catch (error) {
    next(error);
  }
});

cardsRouter.delete('/:id', async (req, res, next) => {
  console.log(req.params.id);
  try {
    const card = await deleteCard(req.params.id);
    res.send(card);
  } catch (error) {
    next(error);
  }
});

cardsRouter.patch('/:id', async (req, res, next) => {
  try {
    const card = await updateCard({...req.body, id: req.params.id});
    res.send(card);
  } catch (error) {
    next(error);
  }
});

cardsRouter.get('/id/:id', async (req, res, next) => {
  try {
    const card = await getCardById(req.params.id);
    if(typeof card === 'object'){
      res.send(card);
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

cardsRouter.get('/name/:name', async (req, res, next) => {
  try {
    const card = await getCardByName(req.params.name);
    if(typeof card === 'object'){
      res.send(card);
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

cardsRouter.get('/', async (req, res, next) => {
  try {
    const cards = await getAllCards();
    res.send(cards);
  } catch (error) {
    next(error);
  }
});

module.exports = cardsRouter;
