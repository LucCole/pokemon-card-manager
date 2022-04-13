import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { getSetById } from '../../api';

import { CardSnippet } from '../';



const useStyles = makeStyles(theme => ({
  cardRow: {
    display: "flex",
    overflow: "scroll",
    margin: "2% 2%"
  }
}))

const Set = ({userData, token}) => {

  const classes = useStyles();


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

    set.id
    ?
    <>
    {/* {
      "name" in set
      ?
      <div>
        <h3>{set.name}</h3>
        <div></div>
      </div>
      :
      'No set found by that id'
    } */}

    <div>
      <img src={set.logo}></img>
      <img src={set.icon}></img>
      <h2>{set.name}</h2>
      <span>Number Of Cards: {set.cards}</span>
      <br></br>
      <span>Normal Cards {set.normalCards}</span>
      <br></br>
      <span>Secret Cards: {set.secretCards}</span>
    </div>

    <div className={classes.cardRow}>
      
      {set.cardList?.map((card, index) => (
        <CardSnippet name={card.name} series={card.series} number={card.number} setCards={card.setCards} image={card.image} key={'card-'+index}></CardSnippet>
      ))}

    </div>
    </>
    :
    <>No set with that id</>
  );
};

export default Set;
