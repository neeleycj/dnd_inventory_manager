import { use, useEffect, useState } from 'react'
import CharacterSheet from '../components/CharacterSheet'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'


export function PlayerView({ logout, createCharacter }) {

const [character, setCharacter] = useState(null);

  
  async function getCharacter(character_id) {
    const res = await fetch(`/character/${character_id}/`, {
      credentials: "same-origin", // include cookies!
    });

    if (res.ok) {
      const character = await res.json();
      setCharacter(character);
      console.log(character);
    } else {
      // handle error
    }
  }

  useEffect(() => {
    getCharacter(3);
  
  }, []);



  return (
    <>
        <div>
     <button><Link to={"/character/create/"}>Create Character</Link></button>
     </div>
      {character ?(
        <CharacterSheet 
        character_name={character.name}
        class={character.class_type}
        level={character.level}
        race={character.race}
        alignment={character.alignment}
        ability_scores={character.ability_scores}
        saving_throws={character.saving_throws}
        combat_stats={character.combat_stats}
        skills={character.skills}
        equipment={character.equipment}
        features_and_traits={character.features_and_traits}
        backstory={character.backstory}
        />
      ) : (
        <div className="loading">
          <h1>Loading...</h1>
        </div>
      )}
      
    </>
  )
}