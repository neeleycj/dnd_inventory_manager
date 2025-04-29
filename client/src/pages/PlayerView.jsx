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
const [campaign, setCampaign] = useState(null);


    
  
  async function getCharacter() {
    const res = await fetch(`/character/${campaignId}/`, {
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

    async function getCampaign() {
        const makeRequest = useFetch();
        const res = await makeRequest(`campaign/details/${campaignId}/`, "GET", null, {
            credentials: "same-origin",
            "Content-Type": "application/json",
            "X-CSRFToken": cookies.get("csrftoken"),
            "Accept": "application/json",
        });
        if (res.ok) {
            const campaign = await res.json();
            setCampaign(campaign);
            console.log(campaign);
        }
    }

  useEffect(() => {
    getCampaign();
    getCharacter();
  
  }, []);

    if (!character || !campaign) {
        return (
            <div className="loading">
                <h1>Loading...</h1>
            </div>
        );
    }

  return (
    <>
        <div>
        <button>
            <Link to={`/campaign/join`}>Back to Campaign Selection</Link>
        </button>
        <button>
            <Link to={`/character/update/${character.id}/${campaignId}/`}>Update Character</Link>
        </button>
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

      <div className="note-list">
        <h2>Notes</h2>
        {campaign.notes.map((note) => (
          <div key={note.id} className="note-card">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </div>
        ))}
        </div>
      
    </>
  )
}