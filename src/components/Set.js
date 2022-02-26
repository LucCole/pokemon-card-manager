import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSetById } from '../api';

const Set = () => {

  const [ set, setSet ] = useState({});

  const { id } = useParams();

  useEffect(async () => {
    console.log('Set use state')
    
      const data = await getSetById(id);

      if(typeof data === 'object'){
        console.log(data);
        setSet(data);
      }
  }, [id]);

  return (
    <>
    {
      "name" in set
      ?
      <div>
        <h3></h3>
        <div></div>
      </div>
      :
      'No set found by that id'
    }
    </>
  );
};

export default Set;
