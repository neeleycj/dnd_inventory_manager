import { useState } from 'react'
import './App.css'
import CharacterSheet from './CharacterSheet'

function App() {
  const [count, setCount] = useState(0)

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
<<<<<<< Updated upstream
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
=======
      
>>>>>>> Stashed changes
      <button onClick={logout}>Logout</button>
      <CharacterSheet 
      character_name="Aragorn"
      class="Fighter"
      level="5"
      race="human"
      alignment="Nuetral Good"
      ability_scores={{
        str: 16,
        dex: 14,
        con: 15,
        int: 10,
        wis: 12,
        cha: 8
      }}
      saving_throws={{
        str: 5,
        con: 4,
        dex: 2,
        wis: 1,
        int: 0,
        cha: -1
      }}
      combat_stats={{
        armor_class: 17,
        initiative: +2,
        speed: "30 ft",
        hit_points: 45,
        hit_dice: "5d10"
      }}
      skills={{
        athletics: "+5",
        acrobatics: "+2",
        stealth: "+2",
        perception: "+3",
        intimidation: "+1"
      }}
      equipment={{
        weapons: ["Longsword", "Shortbow"],
        armor: ["Chain Mail", "Shield"],
        other: ["Explorer's Pack", "Healing Potion x2"]
      }}
      features_and_traits={{
        features: ["Second Wind", "Action Surge"],
        traits: ["Fighting Style: Defense", "Second Wind"],
      }}
      backstory= "Once a soldier in a forgotten war, now a wandering sword-for-hire with a strong sense of justice."
      />
    </>
  )
}

export default App;
