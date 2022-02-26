import React from 'react';
import { Route, Routes } from "react-router-dom";

import { CardRow, Set, SetInfo } from './';




const cards = [
  {
    name: 'Pikachu',
    series: 'XY Generations',
    setNumber: 26,
    cardsInSet: 115,
    image: 'https://images.pokemontcg.io/g1/26_hires.png'
  },
  {
    name: 'Drizzile',
    series: 'XY Generations',
    setNumber: 56,
    cardsInSet: 115,
    image: 'https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/1645076.jpg'
  },
  {
    name: 'Arceus & Dialga & Palkia GX',
    series: 'XY Generations',
    setNumber: 26,
    cardsInSet: 156,
    image: 'https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/1605919.jpg'
  },
  {
    name: 'Ordinary Rod',
    series: 'XY Generations',
    setNumber: 26,
    cardsInSet: 171,
    image: 'https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/1645191.jpg'
  },
  {
    name: 'Ditto',
    series: 'XY Generations',
    setNumber: 26,
    cardsInSet: 17,
    image: 'https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/302988.jpg'
  },
];


const App = () => {
  return <>
    <Routes>
      <Route path='/sets/id/:id' element={<Set></Set>}/>
    </Routes>
    <Routes>
      <Route path='/' element={<CardRow cards={cards}></CardRow>}/>
    </Routes>
  </>
}

export default App;
