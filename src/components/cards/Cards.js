import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardSnippet } from '../';

import { getAllCards } from '../../api';


const useStyles = makeStyles(theme => ({
  cardRow: {
    display: "flex",
    overflow: "scroll",
    margin: "2% 2%"
  }
}))

const Cards = () => {

  console.log('Hey --- hey');

  const classes = useStyles();

  const [ cards, setCards ] = useState([]);

  console.log('cards: ', cards);

  useEffect(async () => {
    
      const data = await getAllCards();

      if(typeof data === 'object'){
        console.log(data);
        setCards(data);
      }
  }, []);

  return (
    <div className={classes.cardRow}>
      
      {cards?.map((card, index) => (
        <CardSnippet name={card.name} series={card.series} number={card.number} setCards={card.setCards} image={card.image} key={'card-'+index}></CardSnippet>
      ))}

    </div>
  );
};

export default Cards;
