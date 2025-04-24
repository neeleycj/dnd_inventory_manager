import { use, useEffect, useState } from 'react'
import CharacterSheet from '../components/CharacterSheet'
import { Link } from 'react-router-dom'
import { useFetch } from "../hooks/useFetch";
import cookies from "js-cookie";
import { useParams } from 'react-router-dom';



export function PlayerView() {
const { campaignId } = useParams();

const [character, setCharacter] = useState(null);
const [user, setUser] = useState(null);

    async function getUser() {
        const makeRequest = useFetch();
                const res = await makeRequest("/user/", "GET", null, {
                    credentials: "same-origin",
                    "Content-Type": "application/json",
                    "X-CSRFToken": cookies.get("csrftoken"),
                    "Accept": "application/json",
                });
                if (res.ok){
                    const user = await res.json();
                    setUser(user);
                    console.log(user);
                }
    }
  
  async function getCharacter(campaign_id) {
    const res = await fetch(`/character/${campaign_id}/`, {
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
    getUser();
    getCharacter(campaignId);
  
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