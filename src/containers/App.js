import React, { useEffect, useState } from 'react';
import './App.scss';
import Pokemon from '../components/pokemon/Pokemon';


function App() {
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    async function getPokemons() {
      const data = await fetch('https://graphql-pokemon2.vercel.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
          query AllPokemons {
          pokemons(first:10 ) {
            id
            name
            number
            classification
            weaknesses
            image 
            types
            weight {
              minimum
              maximum
            }    
          }
        }
        `})
      });

      const js = await data.json()
      const { pokemons } = js.data
      setPokemons(pokemons)
      return
    }
    getPokemons()
  }, [])
  return (
    <div className="App">
        {pokemons.map(item => (
          <Pokemon
            key={item.id}
            image={item.image}
            name={item.name}
            weaknesses={item.weaknesses}
            types={item.types}
            classification={item.classification}
            weight={item.weight}
          />
        ))}
    </div>
  );
}

export default App;
