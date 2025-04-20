import { use, useEffect, useState } from 'react'
import './App.css'
import CharacterSheet from './components/CharacterSheet'
import CreateCharacter from './components/CreateCharacter'
import Cookies from 'js-cookie'

function App() {
 
  const [character, setCharacter] = useState(null);

  async function createCharacter() {
    const res = await fetch("/character/create/", {
      method: "POST",
      credentials: "same-origin", // include cookies!
      body: JSON.stringify({
        name: "Aragorn",
        class: "Fighter",
        level: "5",
        experience: 20,
        race: "human",
        alignment: "Nuetral Good",
        ability_scores: {
          str: 16,
          dex: 14,
          con: 15,
          int: 10,
          wis: 12,
          cha: 8
        },
        saving_throws: {
          str: 5,
          con: 4,
          dex: 2,
          wis: 1,
          int: 0,
          cha: -1
        },
        combat_stats: {
          armor_class: 17,
          initiative: +2,
          speed: "30 ft",
          hit_points: 45,
          hit_dice: "5d10"
        },
        skills:{
          athletics: "+5",
          acrobatics: "+2",
          stealth: "+2",
          perception: "+3",
          intimidation: "+1"
        },
        equipment:{
          weapons: ["Longsword", "Shortbow"],
          armor: ["Chain Mail", "Shield"],
          other: ["Explorer's Pack", "Healing Potion x2"]
        },
        features_and_traits: {
          features: ["Second Wind", "Action Surge"],
          traits: ["Fighting Style: Defense", "Second Wind"],
        },
        backstory: "Once a soldier in a forgotten war, now a wandering sword-for-hire with a strong sense of justice."
      }),
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    });
  }

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
    getCharacter(1);
  
  }, []);


  async function logout() {
    const res = await fetch("/registration/logout/", {
      credentials: "same-origin", // include cookies!
    });

    if (res.ok) {
      // navigate away from the single page app!
      window.location = "/registration/sign_in/";
    } else {
      // handle logout failed!
    }
  }

  return (
    <>
      
      <button onClick={logout}>Logout</button>
      <button onClick={createCharacter}>Create Character</button>
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
      <CreateCharacter/>
    </>
  )
}

export default App;
