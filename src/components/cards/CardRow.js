import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '../';

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
        <Card name={card.name} series={card.series} setNumber={card.setNumber} cardsInSet={card.cardsInSet} image={card.image} key={'card-'+index}></Card>
      ))}

    </div>
  );
};

export default CardRow;
