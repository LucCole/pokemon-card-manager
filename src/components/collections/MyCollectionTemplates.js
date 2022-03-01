import React, { useState, useEffect } from 'react';
import { getMyCollectionTemplates } from '../../api';

import { 
  CollectionHeader
} from '..';

const MyCollectionTemplates = ({ userData, token }) => {

  if(!userData.id){
    return (<h1>Please login to see this page</h1>);
  }

  const [usersCollectionTemplates, setUsersCollectionTemplates] = useState([]);

  useEffect(async () => {
    // collection templates
    const data = await getMyCollectionTemplates(token);
    setUsersCollectionTemplates(data);
  }, []);

  // when usersCollectionTemplates is something other than an array this brekas. This would happen if like it returned an error. We can do the if data === object thing
  return (
    <>
      <h2>My Collection Templates</h2>

      {usersCollectionTemplates.length > 0
      ?
      usersCollectionTemplates.map((collectionTemplate, index) => (
        <CollectionHeader 
          name={collectionTemplate.name} 
          id={collectionTemplate.id}
          description={collectionTemplate.description} 
          image={collectionTemplate.image} 
          key={'collection-templates-'+index}
        ></CollectionHeader>
      ))
    :
    'You have no collection templates'}
    </>
  );
};

export default MyCollectionTemplates;
