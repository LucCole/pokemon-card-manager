import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';

import { getCollectionById, deleteCollection } from '../../api';

import { CardRow, CollectionHeader } from '..';

const Collection = ({userData, token}) => {

  if(!userData.id){
    return (<h1>Please login to see this page</h1>);
  }

  const [ collection, setCollection ] = useState(null);

  const { id } = useParams();

  useEffect(async () => {
    
    const data = await getCollectionById(id, token);

    if(typeof data === 'object'){
      setCollection(data);
    }
  }, [id]);

  const deleteHandler = async (collectionId) => {

    const data = await deleteCollection(collectionId, token);

    if(typeof data === 'object'){
      console.log('deleted');
    }
  };

  return (
    <>
    {
      collection
      ?
      <div>
        <CollectionHeader name={collection.name} description={collection.description} image={collection.image}></CollectionHeader>
        
        
        <Button 
          variant="contained"
          onClick={() => {
            deleteHandler(collection.id);
          }}
        >
          Delete
        </Button>


        {collection.cards.length > 0
        ?
        <CardRow cards={collection.cards}></CardRow>
        :
        null
        }
      </div>
      :
      "You don't have access to this page"
    }
    </>
  );
};

export default Collection;
