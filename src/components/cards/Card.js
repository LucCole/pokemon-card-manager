import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { CardSnippet } from '../';

import { createCard, editCard, getCard } from "../../api";


const useStyles = makeStyles(theme => ({
  cardRow: {
    display: "flex",
    overflow: "scroll",
    margin: "2% 2%",
    // "& > div:not(:last-child)": {
    //   borderRight: "1px solid lightgrey"
    // }
  }
}))

const Card = () => {

  console.log('Card component');
  
  const { id } = useParams();

  console.log('id: ', id);

  const [ card, setCard ] = useState({});

  console.log('card: ', card);

  
  useEffect(async () => {

    console.log('Before call');

    // if(!isCreate){

      const data = await getCard(id);

      console.log('data: ', data);
     
      if(typeof data === 'object'){
        setCard(data);
      }
    // }

  }, [id]);

  const classes = useStyles();

  return (
    <CardSnippet name={card.name} number={card.number} setCards={card.setCards} image={card.image}></CardSnippet>
  );
};

export default Card;
