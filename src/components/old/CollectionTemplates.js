import React, { useState, useEffect } from 'react';
import { getAllCollectionTemplates } from '../../api';

import { CollectionTemplateInfo } from '../';


const CollectionTemplates = () => {

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
    collectionTemplates
    {
      collectionTemplates?.map((collectionTemplate, index) => (
      <CollectionTemplateInfo name={collectionTemplate.name} description={collectionTemplate.description} image={collectionTemplate.image} key={'collection-templates-'+index}></CollectionTemplateInfo>)
      )
    }
    </>
  );
};

export default CollectionTemplates;
