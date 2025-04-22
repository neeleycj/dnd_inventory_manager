import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

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
      <div className="character-sheet">
        <div className="character-sheet-header">
          <h1>Character Name</h1>
          <h2>Class & Level: Fighter 5 | Race: Human | Alignment: Neutral Good</h2>
        </div>

        <div className="character-sheet-grid">
          <div className="character-sheet-section">
            <h3>Ability Scores</h3>
            <div className="ability-scores">
              <div className="ability-score-stat">
                <h4>STR</h4>
                <div className="grey-number-box">16</div>
              </div>
              <div className="ability-score-stat">
                <h4>DEX</h4>
                <div className="grey-number-box">14</div>
              </div>
              <div className="ability-score-stat">
                <h4>CON</h4>
                <div className="grey-number-box">15</div>
              </div>
              <div className="ability-score-stat">
                <h4>INT</h4>
                <div className="grey-number-box">10</div>
              </div>
              <div className="ability-score-stat">
                <h4>WIS</h4>
                <div className="grey-number-box">12</div>
              </div>
              <div className="ability-score-stat">
                <h4>CHA</h4>
                <div className="grey-number-box">8</div>
              </div>
            </div>
          </div>

          <div className="character-sheet-section">
            <h3>Combat Stats</h3>
            <p>Armor Class: <strong>17</strong></p>
            <p>Initiative: <strong>+2</strong></p>
            <p>Speed: <strong>30 ft</strong></p>
            <p>Hit Points: <strong>45</strong></p>
            <p>Hit Dice: <strong>5d10</strong></p>
          </div>

          <div className="character-sheet-section">
            <h3>Saving Throws</h3>
            <p>Strength: +5</p>
            <p>Constitution: +4</p>
            <p>Dexterity: +2</p>
            <p>Wisdom: +1</p>
            <p>Intelligence: +0</p>
            <p>Charisma: -1</p>
          </div>
        </div>

        <div className="character-sheet-grid">
          <div className="character-sheet-section">
            <h3>Skills</h3>
            <p>Acrobatics: +2</p>
            <p>Perception: +3</p>
            <p>Athletics: +5</p>
            <p>Stealth: +2</p>
            <p>Intimidation: +1</p>
          </div>

          <div className="character-sheet-section">
            <h3>Equipment</h3>
            <ul>
              <li>Longsword</li>
              <li>Chain Mail</li>
              <li>Shield</li>
              <li>Explorer’s Pack</li>
              <li>Healing Potion x2</li>
            </ul>
          </div>

          <div className="character-sheet-section">
            <h3>Features & Traits</h3>
            <ul>
              <li>Second Wind</li>
              <li>Action Surge</li>
              <li>Fighting Style: Defense</li>
              <li>Extra Attack</li>
            </ul>
          </div>
        </div>

        <div className="character-sheet-section">
          <h3>Backstory</h3>
          <p>Once a soldier in a forgotten war, now a wandering sword-for-hire with a strong sense of justice.</p>
        </div>
      </div>
      <button onClick={logout}>Logout</button>
    </>
  )
}

export default App;