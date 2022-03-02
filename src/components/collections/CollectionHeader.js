import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  header: {
    display: "flex",
    flexDirection: "row",
    padding: "5px 8px",
    "& img": {
      width: "10vw",
      marginRight: "20px"
    }
  }
}))

const CollectionHeader = ({name, id, description, image, creatorId, creatorName, isTemplate}) => {

  const classes = useStyles();

  return (
    <div className={classes.header}>
      <img src={image}></img>
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
        {id?<h4><Link to={
          `/${isTemplate?'collection-templates':'collections'}/id/${id}`
        }>View Collection</Link></h4>:null}
        {creatorId?<h4><Link to={`/collection-templates/user/${creatorId}`}>{creatorName}</Link></h4>:null}
      </div>
    </div>
  );
};

export default CollectionHeader;
