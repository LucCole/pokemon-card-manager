import React from "react";
import { Button } from '@material-ui/core';
import { createCollectionTemplate } from "../../api";

const TemplateIntoCollectionButton = ({ collectionTemplateId }) => {


  // collectionTemplateId

  const buttonSubmit = async (event) => {
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
        <Button 
          variant="contained" 
          type="button"
          onClick={() => buttonSubmit()}>
          Make Into Collection
        </Button>
      </form>
    </>
  );
};

export default TemplateIntoCollectionButton;
