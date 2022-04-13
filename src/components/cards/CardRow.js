import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardSnippet } from '../';

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

const CardRow = ({cards}) => {

  const classes = useStyles();

  return (
    <div className={classes.cardRow}>
      
      {cards?.map((card, index) => (
        <CardSnippet name={card.name} number={card.number} cardsInSet={card.cardsInSet} image={card.image} key={'card-'+index}></CardSnippet>
      ))}

    </div>
  );
};

export default CardRow;
