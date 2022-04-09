import React, { useState, useEffect } from 'react';
import { getAllCollectionTemplates } from '../../../api';

import { CollectionHeader } from '../..';

const AllCollectionTemplates = () => {

  const [ collectionTemplates, setCollectionTemplates ] = useState([]);

  useEffect(async () => {
    
      const data = await getAllCollectionTemplates();

      if(typeof data === 'object'){
        console.log(data);
        setCollectionTemplates(data);
      }
  }, []);

  return (
    <>
    All Collection Templates
    {
      collectionTemplates?.map((collectionTemplate, index) => (
      <CollectionHeader 
        name={collectionTemplate.name} 
        id={collectionTemplate.id}
        description={collectionTemplate.description} 
        image={collectionTemplate.image} 
        creatorId={collectionTemplate.creatorId} 
        creatorName={collectionTemplate.creatorName} 
        isTemplate={true}
        key={'collection-templates-'+index}
      ></CollectionHeader>)
      )
    }
    </>
  );
};

export default AllCollectionTemplates;
