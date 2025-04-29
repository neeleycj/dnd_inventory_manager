export default function CharacterSheet(props) {
    return (
<div className="character-sheet">
        <div className="character-sheet-header">
          <h1>Character Name: {props.character_name}</h1>
          <h2>Class & Level: {props.class} {props.level} | Race: {props.race} | Alignment: {props.alignment}</h2>
        </div>

        <div className="character-sheet-grid">
          <div className="character-sheet-section">
            <h3>Ability Scores</h3>
            <div className="ability-scores">
              <div className="ability-score-stat">
                <h4>STR</h4>
                <div className="grey-number-box">{props.ability_scores.str}</div>
              </div>
              <div className="ability-score-stat">
                <h4>DEX</h4>
                <div className="grey-number-box">{props.ability_scores.dex}</div>
              </div>
              <div className="ability-score-stat">
                <h4>CON</h4>
                <div className="grey-number-box">{props.ability_scores.con}</div>
              </div>
              <div className="ability-score-stat">
                <h4>INT</h4>
                <div className="grey-number-box">{props.ability_scores.int}</div>
              </div>
              <div className="ability-score-stat">
                <h4>WIS</h4>
                <div className="grey-number-box">{props.ability_scores.wis}</div>
              </div>
              <div className="ability-score-stat">
                <h4>CHA</h4>
                <div className="grey-number-box">{props.ability_scores.cha}</div>
              </div>
            </div>
          </div>

          <div className="character-sheet-section">
            <h3>Combat Stats</h3>
            <p>Armor Class: <strong>{props.combat_stats.armor_class}</strong></p>
            <p>Initiative: <strong>{props.combat_stats.initiative}</strong></p>
            <p>Speed: <strong>{props.combat_stats.speed}</strong></p>
            <p>Hit Points: <strong>{props.combat_stats.hit_points}</strong></p>
            <p>Hit Dice: <strong>{props.combat_stats.hit_dice}</strong></p>
          </div>

          <div className="character-sheet-section">
            <h3>Saving Throws</h3>
            <p>Strength: {props.saving_throws.str}</p>
            <p>Constitution: {props.saving_throws.con}</p>
            <p>Dexterity: {props.saving_throws.dex}</p>
            <p>Wisdom: {props.saving_throws.wis}</p>
            <p>Intelligence: {props.saving_throws.int}</p>
            <p>Charisma: {props.saving_throws.cha}</p>
          </div>
        </div>

        <div className="character-sheet-grid">
          <div className="character-sheet-section">
            <h3>Skills</h3>
            <p>Acrobatics: {props.skills.acrobatics}</p>
            <p>Perception: {props.skills.perception}</p>
            <p>Athletics: {props.skills.athletics}</p>
            <p>Stealth: {props.skills.stealth}</p>
            <p>Intimidation: {props.skills.intimidation}</p>
          </div>

          <div className="character-sheet-section">
            <h3>Equipment</h3>
            {/* Make a section for equipped items that are styled differently */}
            <ul>
                <li><strong>Weapons:</strong></li>
              {props.equipment.weapons.map((weapon, index) => (
                <li key={index}>{weapon}</li>
              ))}
                <li><strong>Armor:</strong></li>
                {props.equipment.armor.map((armor, index) => (
                    <li key={index}>{armor}</li>
                ))}
                <li><strong>Other:</strong></li>
                {props.equipment.other.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
          </div>

          <div className="character-sheet-section">
            <h3>Features & Traits</h3>
            <ul>
              {props.features_and_traits.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
              {props.features_and_traits.traits.map((trait, index) => (
                <li key={index}>{trait}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="character-sheet-section">
          <h3>Backstory</h3>
          <p>{props.backstory}</p>
        </div>
      </div>
    );
}