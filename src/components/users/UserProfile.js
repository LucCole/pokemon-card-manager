import React, { useState, useEffect } from 'react';
// getUsersCollectionTemplates,
import { getUserProfile, getMyCollections } from '../../api';
// import { Button, TextField } from '@material-ui/core';
// import { editUserProfile, editUserEmail, editUserPassword } from "../../api";
import { 
  CollectionHeader
} from '../';

const UserProfile = ({ userData, token }) => {

  if(!userData.id){
    return (<h1>Please login to see this page</h1>);
  }

  const [userProfile, setUserProfile] = useState({});
  // const [usersCollectionTemplates, setUsersCollectionTemplates] = useState([]);
  const [usersCollections, setUsersCollections] = useState([]);

  useEffect(async () => {
    // user information
    const userProfileData = await getUserProfile(userData.id);
    setUserProfile(userProfileData);

    // collection templates
    // const usersCollectionTemplatesData = await getUsersCollectionTemplates(userData.id);
    // setUsersCollectionTemplates(usersCollectionTemplatesData);

    // collection templates
    const usersCollectionsData = await getMyCollections(token);
    setUsersCollections(usersCollectionsData);
  }, []);

  return (
    <>
      <h2>Your Profile Info</h2>

      <h3>username: {userProfile.username}</h3>
      <h3>email: {userProfile.email}</h3>
      <h3>admin: {userProfile.admin?'true':'false'}</h3>
      <h3>super admin: {userProfile.superAdmin?'true':'false'}</h3>
      <br></br>

      {/* <h2>Your collection templates</h2>

      {usersCollectionTemplates?.map((collectionTemplate, index) => (
        <CollectionHeader 
          name={collectionTemplate.name} 
          id={collectionTemplate.id}
          description={collectionTemplate.description} 
          image={collectionTemplate.image} 
          isTemplate={true}
          key={'collection-templates-'+index}
        ></CollectionHeader>
      ))}

      <br></br> */}
      
      <h2>Your collections</h2>

      {usersCollections?.map((collection, index) => (
        <CollectionHeader 
          name={collection.name} 
          id={collection.id}
          description={collection.description} 
          image={collection.image} 
          key={'collection-'+index}
        ></CollectionHeader>
      ))}

      <br></br>

    </>
  );
};

export default UserProfile;
