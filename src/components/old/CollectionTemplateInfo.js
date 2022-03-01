import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  collectionTemplate: {
    display: "flex",
    flexDirection: "row",
    padding: "5px 8px",
    "& img": {
      width: "10vw",
      marginRight: "20px"
    }
  }
}))

const CollectionTemplateInfo = ({name, description, image}) => {

  const classes = useStyles();

  return (
    <div className={classes.collectionTemplate}>
      <img src={image}></img>
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default CollectionTemplateInfo;
