import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';


import { getCollectionTemplateById, deleteCollectionTemplate, collectionTemplateIntoCollection } from '../../../api';

import { CardRow, CollectionHeader } from '../..';


const CollectionTemplate = ({userData, token}) => {

  const navigate = useNavigate();

  const [ collectionTemplate, setCollectionTemplate ] = useState(null);

  const { id } = useParams();

  useEffect(async () => {
    
      const data = await getCollectionTemplateById(id);

      if(typeof data === 'object'){
        console.log(data);
        setCollectionTemplate(data);
      }
  }, [id]);

  const turnIntoCollectionHandler = async (collectionTemplateId) => {

    const data = await collectionTemplateIntoCollection(collectionTemplateId, token)

    if(typeof data === 'object'){
      navigate('/collections/id/'+data.id);
    }else{
      alert(data);
    }
  };

  const deleteHandler = async (collectionTemplateId) => {

    const data = await deleteCollectionTemplate(collectionTemplateId, token);

    if(typeof data === 'object'){
      console.log('deleted');
    }else{
      alert(data);
    }
  };

  return (
    <>
    {
      collectionTemplate
      ?
      <div>
        <CollectionHeader 
          name={collectionTemplate.name} 
          description={collectionTemplate.description} 
          image={collectionTemplate.image}
        ></CollectionHeader>

        {
          "id" in userData
          ?
          <Button 
            variant="contained"
            onClick={() => {
              turnIntoCollectionHandler(collectionTemplate.id);
            }}
          >
            Make into collection
          </Button>
  
          :
          null
        }
        {
          userData.id === collectionTemplate.id
          ?
        
          <Button 
            variant="contained"
            onClick={() => {
              deleteHandler(collectionTemplate.id);
            }}
          >
            Delete
          </Button>
  
          :
          null
        }

        {collectionTemplate.cards.length > 0
        ?
        <CardRow cards={collectionTemplate.cards}></CardRow>
        :
        null
        }
      </div>
      :
      'No set found by that id'
    }
    </>
  );
};

export default CollectionTemplate;
