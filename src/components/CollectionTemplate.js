import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCollectionTemplateById } from '../api';

import { CardRow, CollectionTemplateInfo } from './';


const CollectionTemplate = () => {

  const [ collectionTemplate, setCollectionTemplate ] = useState(null);

  const { id } = useParams();

  useEffect(async () => {
    
      const data = await getCollectionTemplateById(id);

      if(typeof data === 'object'){
        console.log(data);
        setCollectionTemplate(data);
      }
  }, [id]);

  return (
    <>
    {
      collectionTemplate
      ?
      <div>
        <CollectionTemplateInfo name={collectionTemplate.name} description={collectionTemplate.description} image={collectionTemplate.image}></CollectionTemplateInfo>
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
