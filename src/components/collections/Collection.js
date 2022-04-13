import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';

import { getCollectionById, deleteCollection } from '../../api';

import { CardRow, CollectionHeader, SetInfo } from '..';


const Collection = ({userData, token}) => {

  if(!userData.id){
    return (<h1>Please login to see this page</h1>);
  }

  const [ collection, setCollection ] = useState({});

  const { id } = useParams();

  useEffect(async () => {

    console.log('useEffect');
    
    const data = await getCollectionById(id, token);

    console.log('data: ', data);
    if(typeof data === 'object'){
      setCollection(data);
    }
  }, [id]);

  // const deleteHandler = async (collectionId) => {

  //   const data = await deleteCollection(collectionId, token);

  //   if(typeof data === 'object'){
  //     console.log('deleted');
  //   }
  // };

  console.log('collection: collection', collection);

  return (
    <>
    {
      collection.userId = userData.id
      ?
      <div>

        <SetInfo setName={collection.name} logo={collection.logo} numberOfCards={collection.cards} normalCards={collection.normalCards} secretCards={collection.secretCards}></SetInfo>
        {/* <CollectionHeader name={collection.name} description={collection.description} image={collection.image}></CollectionHeader> */}
        
        
        {/* <Button 
          variant="contained"
          onClick={() => {
            deleteHandler(collection.id);
          }}
        >
          Delete
        </Button> */}


        {collection.cardList && collection.cardList.length > 0
        ?
        <CardRow cards={collection.cardList} collectedCards={collection.collectedCards}></CardRow>
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
