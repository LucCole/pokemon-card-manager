import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';

import { createCollectionTemplate, createCollection, getMyCollectionTemplate, getCollectionById, editCollectionTemplate, editCollection } from "../../api";

const CollectionForm = ({ isTemplate, isCreate, setToken, setUserData, userData, token }) => {

  if(!userData.id){
    return (<h1>Please login to see this page</h1>);
  }

  const { id } = useParams();

  const [canAccess, setCanAccess] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [numberOfCards, setNumberOfCards] = useState('');
  const [normalCards, setNormalCards] = useState('');
  const [secretCards, setSecretCards] = useState('');

  useEffect(async () => {

    if(!isCreate){

      console.log()

      let data;

      if(isTemplate){
        data = await getMyCollectionTemplate(id, token);
      }else{
        data = await getCollectionById(id, token);
      }
  
      if(typeof data === 'object'){
        setCanAccess(true);
        setName(data.name);
        setDescription(data.description);
        setImage(data.image);
        setNumberOfCards(data.numberOfCards);
        setNormalCards(data.normalCards);
        setSecretCards(data.secretCards);
      }
    }

  }, [id]);

  const formSubmit = async (event) => {
    event.preventDefault();

    const requestInfo = {
      token
    }

    let data = null;
    
    if(isCreate){

      requestInfo.body = {
        name,
        description,
        image,
        numberOfCards,
        normalCards,
        secretCards,
      }

      if(isTemplate){
        data = await createCollectionTemplate(requestInfo);
      }else{
        data = await createCollection(requestInfo);
      }

    }else{

      requestInfo.id = id;
      
      // could I not just turn an object into an array? why go trhough all of this
      requestInfo.body = {
        columnsToUpdate: [
          {
            "column": "name",
            "value": name
          },
          {
            "column": "description",
            "value": description
          },
          {
            "column": "image",
            "value": image
          },
          {
            "column": "numberOfCards",
            "value": numberOfCards
          },
          {
            "column": "normalCards",
            "value": normalCards
          },
          {
            "column": "secretCards",
            "value": secretCards
          }
        ]
      }

      if(isTemplate){
        data = await editCollectionTemplate(requestInfo);
      }else{
        data = await editCollection(requestInfo);
      }

    }
    console.log(data);
  };

  if(!isCreate && !canAccess){
    return 'You dont have access to edit this'
  }

  return (
    <>
      <form onSubmit={formSubmit}>

        <h2 id="registerhead">Welcome, please {isCreate?'create':'edit'} {isTemplate?'collection template':'collection'}</h2>

        <TextField 
          type="text" 
          label="Collection Name" 
          required
          minLength="3"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <TextField 
          type="text" 
          label="Description" 
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <TextField 
          type="text" 
          label="Image" 
          value={image}
          onChange={(event) => setImage(event.target.value)}
        />

        <TextField 
          type="text" 
          label="Number Of Cards"
          value={numberOfCards}
          onChange={(event) => setNumberOfCards(event.target.value)}
        />

        <TextField 
          type="text" 
          label="normalCards"
          value={normalCards}
          onChange={(event) => setNormalCards(event.target.value)}
        />

        <TextField 
          type="text" 
          label="Secret Cards" 
          value={secretCards}
          onChange={(event) => setSecretCards(event.target.value)}
        />

        <Button 
          variant="contained" 
          type="submit">
          {isCreate?'Create':'Update'}
        </Button>
      </form>
    </>
  );
};

export default CollectionForm;
