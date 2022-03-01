import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  collection: {
    display: "flex",
    flexDirection: "row",
    padding: "5px 8px",
    "& img": {
      width: "10vw",
      marginRight: "20px"
    }
  }
}))

const CollectionInfo = ({name, description, image}) => {

  const classes = useStyles();

  return (
    <div className={classes.collection}>
      <img src={image}></img>
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default CollectionInfo;
