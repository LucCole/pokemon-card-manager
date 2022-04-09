import React, { useState, useEffect }  from 'react';
import { Route, Routes } from "react-router-dom";

import { getUser } from '../api';

import { 
  UserForm, 
  UserProfile,
  // Set, 
  Collection,
  MyCollectionTemplates,
  UsersCollectionTemplates,
  AllCollectionTemplates,
  CollectionTemplate,
  CollectionForm,
  MyCollections,
  Card,
  CardForm,
  // CardSnippet
  Cards
} from './';

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

  const [token, setToken] = useState('');
  const [userData, setUserData] = useState({});

  // token / userData
  useEffect(async () => {
    if (!token) {
      setToken(localStorage.getItem('pokemon-card-manager-token'));
      return;
    }
    const data = await getUser(token);
    setUserData(data);
  }, [token]);

  return <>
    <Routes>

      {/* Users */}

      <Route path='/register' element={<UserForm action='register' setToken={setToken} setUserData={setUserData}/>}/>
      <Route path='/login' element={<UserForm action='login' setToken={setToken} setUserData={setUserData}/>}/>
      <Route path='/users/profile' element={<UserProfile userData={userData} token={token}/>}/>

      {/* Collections and Collection Templates */}

      <Route path='/collection-templates' element={<AllCollectionTemplates />}/>
      <Route path='/collection-templates/me' element={<MyCollectionTemplates userData={userData} token={token}/>}/>
      <Route path='/collection-templates/user/:id' element={<UsersCollectionTemplates />}/>
      <Route path='/collection-templates/id/:id' element={<CollectionTemplate userData={userData}  token={token}/>}/>
      <Route path='/collection-templates/create' element={
        <CollectionForm 
          isTemplate={true} 
          isCreate={true} 
          token={token} 
          setToken={setToken} 
          userData={userData} 
          setUserData={setUserData} 
        />
      }/>
      <Route path='/collection-templates/edit/:id' element={
        <CollectionForm 
          isTemplate={true} 
          isCreate={false} 
          token={token} 
          setToken={setToken} 
          userData={userData} 
          setUserData={setUserData} 
        />
      }/>

      <Route path='/collections/me' element={<MyCollections userData={userData} token={token}/>}/>
      <Route path='/collections/id/:id' element={<Collection userData={userData} token={token}/>}/>
      <Route path='/collections/create' element={
        <CollectionForm 
          isTemplate={false} 
          isCreate={true} 
          token={token} 
          setToken={setToken} 
          userData={userData} 
          setUserData={setUserData} 
        />
      }/>
      <Route path='/collections/edit/:id' element={
        <CollectionForm 
          isTemplate={false} 
          isCreate={false} 
          token={token} 
          setToken={setToken} 
          userData={userData} 
          setUserData={setUserData} 
        />
      }/>

      {/* Cards */}

      {/* 
      
        TODO

        - veiw card 
        
        - create card √
        - edit card √
        - delete card
        
        - Add card to collection
        - Remove card from collection
        - Add card to collection template
        - Remove card from collection template

      */}

      <Route path='/cards' element={<Cards />}/>
      <Route path='/cards/:id' element={<Card name={cards[0].name} series={cards[0].series} setNumber={cards[0].setNumber} cardsInSet={cards[0].cardsInSet} image={cards[0].image} />}/>
      <Route path='/cards/create' element={<CardForm isCreate={true} userData={userData} token={token} />}/>
      <Route path='/cards/edit/:id' element={<CardForm isCreate={false} userData={userData} token={token} />}/>

      








    </Routes>
  </>
}

export default App;
