import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


import { createCard, editCard, getCard } from "../../api";


const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    flexDirection: "column"
  }
}))


const CardForm = ({ isCreate, userData, token }) => {

  if(!userData.id){
    return (<h1>Please login to see this page</h1>);
  }

  const { id } = useParams();

  const classes = useStyles();

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [rarity, setRarity] = useState('Common');
  const [number, setNumber] = useState(1);
  const [set, setSet] = useState(1);
  // const [typeNormal, setTypeNormal] = useState('True');
  // const [typeHollo, setTypeHollo] = useState('False');
  // const [typeReverseHollo, setTypeReverseHollo] = useState('False');
  // const [typeFoil, setTypeFoil] = useState('False');
  const [artist, setArtist] = useState('');

  useEffect(async () => {

    if(!isCreate){

      const data = await getCard(id, token);
     
      if(typeof data === 'object'){
        setName(data.name);
        setImage(data.image);
        setRarity(data.rarity);
        setNumber(data.number);
        setSet(data.set);
        // setTypeNormal(data.typeNormal === true ? 'True' : 'False');
        // setTypeHollo(data.typeHollo === true ? 'True' : 'False');
        // setTypeReverseHollo(data.typeReverseHollo === true ? 'True' : 'False');
        // setTypeFoil(data.typeFoil === true ? 'True' : 'False');
        setArtist(data.artist);
      }
    }

  }, [id]);

  const formSubmit = async (event) => {
    event.preventDefault();

    const requestInfo = {
      token
    }

    let data = null;
    
    if(isCreate){

      requestInfo.body = {
        name,
        image,
        rarity,
        number,
        set,
        // typeNormal,
        // typeHollo,
        // typeReverseHollo,
        // typeFoil,
        artist,
        set: 1
      }

      data = await createCard(requestInfo);

    }else{

      requestInfo.id = id;
      
      // could I not just turn an object into an array? why go trhough all of this
      requestInfo.body = {
        columnsToUpdate: [
          {
            "column": "name",
            "value": name
          },
          {
            "column": "image",
            "value": image
          },
          {
            "column": "rarity",
            "value": rarity
          },
          {
            "column": "number",
            "value": number
          },
          // {
          //   "column": "typeNormal",
          //   "value": typeNormal
          // },
          // {
          //   "column": "typeHollo",
          //   "value": typeHollo
          // },
          // {
          //   "column": "typeReverseHollo",
          //   "value": typeReverseHollo
          // },
          // {
          //   "column": "typeFoil",
          //   "value": typeFoil
          // },
          {
            "column": "artist",
            "value": artist
          },
          {
            "column": "set",
            "value": 2
          }
        ]
      }
      
      data = await editCard(requestInfo);

    }
    console.log(data);
  };

  // if(!isCreate && !canAccess){
  //   return 'You dont have access to edit this'
  // }

  return (
    <>
      <form className={classes.form} onSubmit={formSubmit}>

        {/* Name */}
        <TextField 
          type="text" 
          label="Name" 
          required
          minLength="3"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        {/* Image */}
        <TextField 
          type="text" 
          label="Image" 
          required
          minLength="3"
          value={image}
          onChange={(event) => setImage(event.target.value)}
        />

        {/* Rarity */}
        <FormControl fullWidth>
          <InputLabel id="rarity-select-label">Rarity</InputLabel>
          <Select
            labelId="rarity-select-label"
            id="rarity-select"
            value={rarity}
            label="Rarity"
            onChange={(event) => setRarity(event.target.value)}
          >
            <MenuItem value="Common">Common</MenuItem>
            <MenuItem value="Uncommon">Uncommon</MenuItem>
            <MenuItem value="Rare">Rare</MenuItem>
            <MenuItem value="Ultra Rare">Ultra Rare</MenuItem>
          </Select>
        </FormControl>

        {/* set - select
        <FormControl fullWidth>
          <InputLabel id="rarity-select-label">Rarity</InputLabel>
          <Select
            labelId="rarity-select-label"
            id="rarity-select"
            value={rarity}
            label="Rarity"
            onChange={(event) => setRarity(event.target.value)}
          >
            <MenuItem value="">Common</MenuItem>
            <MenuItem value="">Uncommon</MenuItem>
            <MenuItem value="">Rare</MenuItem>
            <MenuItem value="">Ultra Rare</MenuItem>
          </Select>
        </FormControl> */}

        {/* Number in set */}
        <TextField 
          type="number" 
          label="Number" 
          required
          minLength="3"
          value={number}
          onChange={(event) => setNumber(event.target.value)}
        />

        <TextField 
          type="number" 
          label="set" 
          required
          minLength="1"
          value={set}
          onChange={(event) => setSet(event.target.value)}
        />

        {/* Card types */}

        {/* Normal */}
        {/* <FormControl>
          <FormLabel id="normal-radio-label">Normal</FormLabel>
          <RadioGroup
            row
            aria-labelledby="normal-radio-label"
            value={typeNormal}
            name="normal-radio-group"
            onChange={(event) => setTypeNormal(event.target.value)}
          >
            <FormControlLabel value='True' control={<Radio color="primary"/>} label="True" />
            <FormControlLabel value='False'control={<Radio />} label="False" />
          </RadioGroup>
        </FormControl> */}

        {/* Hollo */}
        {/* <FormControl>
          <FormLabel id="hollo-radio-label">Hollo</FormLabel>
          <RadioGroup
            row
            aria-labelledby="hollo-radio-label"
            value={typeHollo}
            name="hollo-radio-group"
            onChange={(event) => setTypeHollo(event.target.value)}
          >
            <FormControlLabel value='True' control={<Radio color="primary"/>} label="True" />
            <FormControlLabel value='False' control={<Radio />} label="False" />
          </RadioGroup>
        </FormControl> */}

        {/* Reverse Hollo */}
        {/* <FormControl>
          <FormLabel id="reverse-hollo-radio-label">Reverse Hollo</FormLabel>
          <RadioGroup
            row
            aria-labelledby="reverse-hollo-radio-label"
            value={typeReverseHollo}
            name="reverse-hollo-radio-group"
            onChange={(event) => setTypeReverseHollo(event.target.value)}
          >
            <FormControlLabel value='True' control={<Radio color="primary"/>} label="True" />
            <FormControlLabel value='False' control={<Radio />} label="False" />
          </RadioGroup>
        </FormControl> */}
        
        {/* Foil */}
        {/* <FormControl>
          <FormLabel id="foil-radio-label">Foil</FormLabel>
          <RadioGroup
            row
            aria-labelledby="foil-radio-label"
            value={typeFoil}
            name="foil-radio-group"
            onChange={(event) => setTypeFoil(event.target.value)}
          >
            <FormControlLabel value='True' control={<Radio color="primary"/>} label="True" />
            <FormControlLabel value='False' control={<Radio />} label="False" />
          </RadioGroup>
        </FormControl> */}

        {/* Artist */}
        <TextField 
          type="text" 
          label="Artist" 
          required
          minLength="3"
          value={artist}
          onChange={(event) => setArtist(event.target.value)}
        />

        <Button 
          variant="contained" 
          type="submit">
          {isCreate?'Create':'Update'}
        </Button>
      </form>
    </>
  );
};

export default CardForm;
