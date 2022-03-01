import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getUsersCollectionTemplates } from '../../api';
import { 
  CollectionHeader
} from '../';

const UsersCollectionTemplates = ({  }) => {

  const { id } = useParams();

  const [usersCollectionTemplates, setUsersCollectionTemplates] = useState([]);

  useEffect(async () => {
    // collection templates
    const usersCollectionTemplatesData = await getUsersCollectionTemplates(id);
    setUsersCollectionTemplates(usersCollectionTemplatesData);

    console.log(usersCollectionTemplatesData);
  }, []);

  return (
    <>
      <h2>My Collection Templates</h2>

      {usersCollectionTemplates.length > 0
      ? 
      usersCollectionTemplates.map((collectionTemplate, index) => (
        <CollectionHeader name={collectionTemplate.name} description={collectionTemplate.description} image={collectionTemplate.image} key={'collection-templates-'+index}></CollectionHeader>
      ))
      :
      'User has no collection templates'}
    </>
  );
};

export default UsersCollectionTemplates;
