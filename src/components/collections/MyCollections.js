import React, { useState, useEffect } from 'react';
import { getMyCollections } from '../../api';

import { 
  CollectionHeader
} from '..';

const MyCollections = ({ userData, token }) => {

  if(!userData.id){
    return (<h1>Please login to see this page</h1>);
  }

  const [usersCollections, setUsersCollections] = useState([]);

  useEffect(async () => {
    const data = await getMyCollections(token);
    setUsersCollections(data);
  }, []);

  return (
    <>
      <h2>My Collections</h2>

      {usersCollections.length > 0
      ?
      usersCollections.map((collection, index) => (
        <CollectionHeader 
          name={collection.name} 
          id={collection.id}
          description={collection.description} 
          image={collection.image} 
          key={'collections-'+index}
        ></CollectionHeader>
      ))
    :
    'You have no collections'}
    </>
  );
};

export default MyCollections;
