import React from 'react';
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

const CardRow = () => {
  
  const { id } = useParams();

  const [ card, setCard ] = useState(null);

  
  useEffect(async () => {

    if(!isCreate){

      const data = await getCard(id, token);
     
      if(typeof data === 'object'){
        setCard(data);
      }
    }

  }, [id]);

  const classes = useStyles();

  return (
    <CardSnippet name={name} series={series} setNumber={setNumber} cardsInSet={cardsInSet} image={image}></CardSnippet>
  );
};

export default CardRow;
