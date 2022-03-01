import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCollectionById } from '../../api';

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

  return (
    <>
    {
      collection
      ?
      <div>
        <CollectionHeader name={collection.name} description={collection.description} image={collection.image}></CollectionHeader>
        {collection.cards.length > 0
        ?
        <CardRow cards={collection.cards}></CardRow>
        :
        null
        }
      </div>
      :
      'No collection found by that id'
    }
    </>
  );
};

export default Collection;
