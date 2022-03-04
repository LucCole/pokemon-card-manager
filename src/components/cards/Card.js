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

const CardRow = ({name, series, setNumber, cardsInSet, image}) => {
  console.log(name, series, setNumber, cardsInSet, image);

  const classes = useStyles();

  return (
    <CardSnippet name={name} series={series} setNumber={setNumber} cardsInSet={cardsInSet} image={image}></CardSnippet>
  );
};

export default CardRow;
