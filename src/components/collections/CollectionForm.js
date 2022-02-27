import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from '@material-ui/core';
import { createCollectionTemplate } from "../../api";

const CollectionForm = ({ isTemplate, isCreate, setToken, setUserData, userData, token }) => {

  if(!userData.id){
    return (<h1>Please login to see this page</h1>);
  }

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [numberOfCards, setNumberOfCards] = useState('');
  const [normalCards, setNormalCards] = useState('');
  const [secretCards, setSecretCards] = useState('');

  const formSubmit = async (event) => {
    event.preventDefault();

    const requestInfo = {
      body: {
        name,
        description,
        image,
        numberOfCards,
        normalCards,
        secretCards,
      },
      token
    }

    let data = null;

    if(isTemplate){
      data = await createCollectionTemplate(requestInfo);
    }else{
      // data = await createCollection(requestInfo);
    }

    // if(typeof data === 'object'){
    //   localStorage.setItem( 'pokemon-card-manager-token', data.token );
    //   setToken(data.token);
    //   setUserData(data.user);
    //   // ??
    //   navigate('/users/profile');
    // }else{
    //   alert(data);
    // }
  };

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
