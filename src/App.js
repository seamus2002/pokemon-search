import React, { useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [pokemon, setPokemon] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const [info, setInfo] = useState({
    name: '',
    species: '',
    type1: '',
    type2: '',
    img: '',
  });

  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((response) => {
      setInfo({
        name: pokemon,
        species: response.data.species.name,
        type: response.data.types.map(type => type.type.name).join(", "),
        img: response.data.sprites.front_default,
      });
      setIsSelected(true);
    });
  }

  return (
    <div className="App">
      <div className='top-banner'>
        <h1 className='banner-text'>Welcome to the Pokedex</h1>
        <br />
        <input type='text' onChange={(event) => setPokemon(event.target.value)} />
        <br />
        <br />
        <button type="button" className="btn btn-light" onClick={searchPokemon}>Search</button>
      </div>
      
      <div className='display'>
        {!isSelected ? (
          <h1 className='pokemon-name'>Search for a Pokemon!</h1>
        ) : (
          <>
            <h2 className='text-capitalize pokemon-name'>{info.species}</h2>
            <h2 className='text-capitalize'>Type: {info.type}</h2>
            <img src={info.img} />
          </>)}
      </div>
    </div>
  );
}

export default App;
