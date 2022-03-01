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

const CollectionHeader = ({name, id, description, image, creatorId=null, creatorName=null}) => {

  const classes = useStyles();

  return (
    <div className={classes.header}>
      <img src={image}></img>
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
        <h4><Link to={"/collection-templates/id/"+id}>View Collection</Link></h4>
        <h4>{creatorId?<Link to={"/collection-templates/user/"+creatorId}>{creatorName}</Link>:null}</h4>
      </div>
    </div>
  );
};

export default CollectionHeader;
