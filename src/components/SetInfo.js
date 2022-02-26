import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  logo: {
    width: "50px",
    height: "50px"
  }
}))

const SetInfo = ({setName, series, logo, numberOfCards, normalCards, secretCards}) => {

  const classes = useStyles();

  return (
    <div>
      <img src={logo} className={classes.logo}></img>
      <h2>{setName}</h2>
      <h3>series: {series}</h3>
      <span>Number Of Cards: {numberOfCards}</span>
      <br></br>
      <span>Normal Cards {normalCards}</span>
      <br></br>
      <span>Secret Cards: {secretCards}</span>
    </div>
  );
};

export default SetInfo;
