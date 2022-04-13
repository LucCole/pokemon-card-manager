import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { Button } from '@material-ui/core';
import { SetInfo } from '../';

import { getAllSets } from '../../api';


// const useStyles = makeStyles(theme => ({
//   cardRow: {
//     display: "flex",
//     overflow: "scroll",
//     margin: "2% 2%"
//   }
// }))

const Sets = (userData, token) => {

  console.log('Hey --- hey');

  // const classes = useStyles();

  const [ sets, setSets ] = useState([]);

  console.log('sets: ', sets);

  useEffect(async () => {
    
      const data = await getAllSets();

      if(typeof data === 'object'){
        console.log(data);
        setSets(data);
      }
  }, []);


  const formSubmit = async (event) => {
    event.preventDefault();

    const requestInfo = {
      token
    }

    let data = null;
    
    if(isCreate){
      data = await createCollection(requestInfo);
    }

    console.log(data);
  };

  return (
    <form onSubmit={formSubmit}>
      {sets?.map((set, index) => (
        <div key={'set-'+index}>
          <SetInfo setName={set.name} logo={set.logo} numberOfCards={set.cards} normalCards={set.normalCards} secretCards={set.secretCards}></SetInfo>
          <Button variant="contained">
            <Link to={`/sets/${set.id}`}>Veiw Set</Link>
          </Button>

          {
            userData.id
            ?
            <Button variant="contained" onClick={() => {
              
            }}>{true?'Start Collection':'Veiw Collection'}</Button>
            :
            null
          }
        </div>
      ))}

    </form>
  );
};

export default Sets;
