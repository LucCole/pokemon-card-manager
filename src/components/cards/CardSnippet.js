import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  card: {
    textAlign: "center",
    // This should be responsive to the size of the content right? Not set at 240
    padding: "5px 0",
    "& > img": {
      textAlign: "center",
      maxHeight: "250px",
    },
    "& > h3": {
      fontSize: "1.1em"
    }
  },
  series: {
    fontSize: "1em",
    marginBottom: "5px",
    "& > h4": {
      marginRight: "5%"
    } 
  }
}))

const CardSnippet = ({name, series, setNumber, cardsInSet, image}) => {

  const classes = useStyles();

  return (
    <div className={classes.card}>
      <img src={image}></img>
      <h3>{name}</h3>
      <div className={classes.series}>
        <h4>{series}</h4>
        <span>({setNumber}/{cardsInSet})</span>
      </div>
    </div>
  );
};

export default CardSnippet;
