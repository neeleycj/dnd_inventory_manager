import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import cookies from "js-cookie";
import { Link } from "react-router-dom";


export function UpdateCharacter() {
  const navigate = useNavigate();
  const [modalItem, setModalItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { characterId } = useParams();
  const { campaignId } = useParams();
  const [name, setName] = useState("");
  const [class_type, setClass_type] = useState("");
  const [level, setLevel] = useState("");
  const [race, setRace] = useState("");
  const [alignment, setAlignment] = useState("");
  const [ability_scores, setAbility_scores] = useState({
    str: "",
    dex: "",
    con: "",
    int: "",
    wis: "",
    cha: ""
  });
  const [combat_stats, setCombat_stats] = useState({
    armor_class: "",
    initiative: "",
    speed: "",
    hit_points: "",
    hit_dice: ""
  });
  const [saving_throws, setSaving_throws] = useState({
    str: "",
    con: "",
    dex: "",
    wis: "",
    int: "",
    cha: ""
  });
  const [skills, setSkills] = useState({
    athletics: "",
    acrobatics: "",
    stealth: "",
    perception: "",
    intimidation: ""
  });
  const [equipment, setEquipment] = useState({
    weapons: [],
    armor: [],
    other: []
  });
  const [features_and_traits, setFeatures_and_traits] = useState({
    features: [],
    traits: []
  });
  const [backstory, setBackstory] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const makeRequest = useFetch();
    const res = await makeRequest(`/character/update/${characterId}`, "POST", {
      name,
      class_type,
      level,
      race,
      alignment,
      ability_scores,
      combat_stats,
      saving_throws,
      skills,
      equipment,
      features_and_traits,
      backstory,
      campaignId,
    });

    if (res.ok) {
      const character = await res.json();
      navigate(`/character/${campaignId}/`);
    }
  }

  async function getCharacter() {
    const makeRequest = useFetch();
    const res = await makeRequest(`character/${campaignId}/`, "GET", null, {
      credentials: "same-origin",
      "Content-Type": "application/json",
      "X-CSRFToken": cookies.get("csrftoken"),
      "Accept": "application/json",
    });
    if (res.ok) {
      const character = await res.json();
      setName(character.name);
      setClass_type(character.class_type);
      setLevel(character.level);
      setRace(character.race);
      setAlignment(character.alignment);
      setAbility_scores(character.ability_scores);
      setCombat_stats(character.combat_stats);
      setSaving_throws(character.saving_throws);
      setSkills(character.skills);
      setEquipment(character.equipment);
      setFeatures_and_traits(character.features_and_traits);
      setBackstory(character.backstory);
    }
  }
  useEffect(() => {
    getCharacter();
  }, []);

  function handleEquipmentChange(category, index, value) {
    setEquipment((prevEquipment) => {
      const updatedCategory = [...prevEquipment[category]];
      updatedCategory[index] = value; // Update the specific item
      return {
        ...prevEquipment,
        [category]: updatedCategory, // Update the category in the state
      };
    });
  }

  function addEquipment(e, category) {
    e.preventDefault(); // Prevent the default form submission
    setEquipment((prevEquipment) => ({
      ...prevEquipment,
      [category]: [...prevEquipment[category], ""], // Add an empty string to the category
    }));
  }

  function handleFTChange(category, index, value) {
    setFeatures_and_traits((prevFT) => {
      const updatedCategory = [...prevFT[category]];
      updatedCategory[index] = value; // Update the specific item
      return {
        ...prevFT,
        [category]: updatedCategory, // Update the category in the state
      };
    });
  }

  function addFT(e, category) {
    e.preventDefault(); // Prevent the default form submission
    setFeatures_and_traits((prevFT) => ({
      ...prevFT,
      [category]: [...prevFT[category], ""], // Add an empty string to the category
    }));
  }

  function handleNestedStateChange(setState, key, value) {
    setState((prevState) => ({
      ...prevState, // Keep the other properties intact
      [key]: value, // Update the specific property
    }));
  }

  return (
    <>
      <button>
        <Link to={`/character/${campaignId}/`}>Back to Character</Link>
      </button>
      <div className="character-sheet">
        <form action="">
          <div className="character-sheet-header">
            <h1>Character Name: <span><input type="text" name="name" value={name} onChange={e => setName(e.target.value)} /></span></h1>
            <h2>Class & Level: <span><input type="text" name="class_type" value={class_type} onChange={e => setClass_type(e.target.value)} />
            </span> <span><input type="text" name="level" value={level} onChange={e => setLevel(e.target.value)} /></span>
              | Race: <span><input type="text" name="race" value={race} onChange={e => setRace(e.target.value)} /></span>
              | Alignment: <span><input type="text" name="alignment" value={alignment} onChange={e => setAlignment(e.target.value)} /></span></h2>
          </div>

          <div className="character-sheet-grid">
            <div className="character-sheet-section">
              <h3>Ability Scores</h3>
              <div className="ability-scores">
                <div className="ability-score-stat">
                  <h4>STR</h4>
                  <div className="grey-number-box"><span><input
                    type="text"
                    name="str"
                    value={ability_scores.str}
                    onChange={e => handleNestedStateChange(setAbility_scores, "str", e.target.value)} /></span></div>
                </div>
                <div className="ability-score-stat">
                  <h4>DEX</h4>
                  <div className="grey-number-box"><span><input
                    type="text"
                    name="dex"
                    value={ability_scores.dex}
                    onChange={e => handleNestedStateChange(setAbility_scores, "dex", e.target.value)} /></span></div>
                </div>
                <div className="ability-score-stat">
                  <h4>CON</h4>
                  <div className="grey-number-box"><span><input
                    type="text"
                    name="con"
                    value={ability_scores.con}
                    onChange={e => handleNestedStateChange(setAbility_scores, "con", e.target.value)}
                  /></span></div>
                </div>
                <div className="ability-score-stat">
                  <h4>INT</h4>
                  <div className="grey-number-box"><span><input
                    type="text"
                    name="int"
                    value={ability_scores.int}
                    onChange={e => handleNestedStateChange(setAbility_scores, "int", e.target.value)}
                  /></span></div>
                </div>
                <div className="ability-score-stat">
                  <h4>WIS</h4>
                  <div className="grey-number-box"><span><input
                    type="text"
                    name="wis"
                    value={ability_scores.wis}
                    onChange={e => handleNestedStateChange(setAbility_scores, "wis", e.target.value)}
                  /></span></div>
                </div>
                <div className="ability-score-stat">
                  <h4>CHA</h4>
                  <div className="grey-number-box"><span><input
                    type="text"
                    name="cha"
                    value={ability_scores.cha}
                    onChange={e => handleNestedStateChange(setAbility_scores, "cha", e.target.value)}
                  /></span></div>
                </div>
              </div>
            </div>

            <div className="character-sheet-section">
              <h3>Combat Stats</h3>
              <p>Armor Class: <strong><span><input
                type="text"
                name="AC"
                value={combat_stats.armor_class}
                onChange={e => handleNestedStateChange(setCombat_stats, "armor_class", e.target.value)}
              /></span></strong></p>
              <p>Initiative: <strong><span><input
                type="text"
                name="init"
                value={combat_stats.initiative}
                onChange={e => handleNestedStateChange(setCombat_stats, "initiative", e.target.value)}
              /></span></strong></p>
              <p>Speed: <strong><span><input
                type="text"
                name="speed"
                value={combat_stats.speed}
                onChange={e => handleNestedStateChange(setCombat_stats, "speed", e.target.value)}
              /></span></strong></p>
              <p>Hit Points: <strong><span><input
                type="text"
                name="hp"
                value={combat_stats.hit_points}
                onChange={e => handleNestedStateChange(setCombat_stats, "hit_points", e.target.value)}
              /></span></strong></p>
              <p>Hit Dice: <strong><span><input
                type="text"
                name="hd"
                value={combat_stats.hit_dice}
                onChange={e => handleNestedStateChange(setCombat_stats, "hit_dice", e.target.value)}
              /></span></strong></p>
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
              <p>Acrobatics: <span><input
                type="text"
                name="acrobatics"
                value={skills.acrobatics}
                onChange={e => handleNestedStateChange(setSkills, "acrobatics", e.target.value)}
              /></span></p>
              <p>Perception: <span><input
                type="text"
                name="perception"
                value={skills.perception}
                onChange={e => handleNestedStateChange(setSkills, "perception", e.target.value)}
              /></span></p>
              <p>Athletics: <span><input
                type="text"
                name="athletics"
                value={skills.athletics}
                onChange={e => handleNestedStateChange(setSkills, "athletics", e.target.value)}
              /></span></p>
              <p>Stealth: <span><input
                type="text"
                name="stealth"
                value={skills.stealth}
                onChange={e => handleNestedStateChange(setSkills, "stealth", e.target.value)}
              /></span></p>
              <p>Intimidation: <span><input
                type="text"
                name="intimidation"
                value={skills.intimidation}
                onChange={e => handleNestedStateChange(setSkills, "intimidation", e.target.value)}
              /></span></p>
            </div>

            <ul className="equipment-list">
              <li><strong>Weapons:</strong></li>
              {equipment.weapons.map((weapon, index) => (
                <li key={`weapon-${index}`}>
                  <input
                    type="text"
                    value={weapon}
                    onClick={async () => {
                      try {
                        const formattedWeapon = weapon.toLowerCase().replace(/ /g, "-");
                        const res = await fetch(`https://www.dnd5eapi.co/api/2014/equipment/${formattedWeapon}`);
                        if (res.ok) {
                          const data = await res.json();
                          setModalItem(data);
                          setIsModalOpen(true);
                        }
                      } catch (error) {
                        console.error('No API data for weapon:', weapon);
                      }
                    }}
                    onChange={(e) => handleEquipmentChange("weapons", index, e.target.value)}
                  />
                </li>
              ))}

              <li><strong>Armor:</strong></li>
              {equipment.armor.map((armor, index) => (
                <li key={`armor-${index}`}>
                  <input
                    type="text"
                    value={armor}
                    onClick={async () => {
                      try {
                        const formattedArmor = armor.toLowerCase().replace(/ /g, "-");
                        const res = await fetch(`https://www.dnd5eapi.co/api/2014/equipment/${formattedArmor}`);
                        if (res.ok) {
                          const data = await res.json();
                          setModalItem(data);
                          setIsModalOpen(true);
                        }
                      } catch (error) {
                        console.error('No API data for armor:', armor);
                      }
                    }}
                    onChange={(e) => handleEquipmentChange("armor", index, e.target.value)}
                  />
                </li>
              ))}

              <li><strong>Other:</strong></li>
              {equipment.other.map((item, index) => (
                <li key={`other-${index}`}>
                  <input
                    type="text"
                    value={item}
                    onClick={async () => {
                      try {
                        const formattedItem = item.toLowerCase().replace(/ /g, "-");
                        const res = await fetch(`https://www.dnd5eapi.co/api/2014/equipment/${formattedItem}`);
                        if (res.ok) {
                          const data = await res.json();
                          setModalItem(data);
                          setIsModalOpen(true);
                        }
                      } catch (error) {
                        console.error('No API data for item:', item);
                      }
                    }}
                    onChange={(e) => handleEquipmentChange("other", index, e.target.value)}
                  />
                </li>
              ))}
            </ul>

            <div className="character-sheet-section">
              <h3>Features & Traits</h3>
              <ul>
                <li><strong>Features:</strong></li>
                {features_and_traits.features.map((feature, index) => (
                  <li key={index}>
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFTChange("features", index, e.target.value)}
                    />
                  </li>
                ))}
                <li><strong>Traits:</strong></li>
                {features_and_traits.traits.map((trait, index) => (
                  <li key={index}>
                    <input
                      type="text"
                      value={trait}
                      onChange={(e) => handleFTChange("traits", index, e.target.value)}
                    />
                  </li>
                ))}
              </ul>
              <button onClick={(e) => addFT(e, "features")}>Add Feature</button>
              <button onClick={(e) => addFT(e, "traits")}>Add Trait</button>
            </div>
          </div>
          <div className="character-sheet-section">
            <h3>Backstory</h3>
            <p><span><input type="text" name="backstory" value={backstory} onChange={e => setBackstory(e.target.value)} /></span></p>
          </div>
          <button type="submit" onClick={handleSubmit}>Save Character</button>

          {isModalOpen && modalItem && (
            <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-modal" onClick={() => setIsModalOpen(false)}>X</button>
                <h2>{modalItem.name}</h2>

                {modalItem.desc?.length > 0 && (
                  <div>
                    {modalItem.desc.map((line, idx) => <p key={idx}>{line}</p>)}
                  </div>
                )}

                {modalItem.cost && (
                  <p><strong>Cost:</strong> {modalItem.cost.quantity} {modalItem.cost.unit}</p>
                )}

                {modalItem.damage && (
                  <p><strong>Damage:</strong> {modalItem.damage.damage_dice} ({modalItem.damage.damage_type.name})</p>
                )}

                {modalItem.weight && (
                  <p><strong>Weight:</strong> {modalItem.weight} lbs</p>
                )}

                {modalItem.properties?.length > 0 && (
                  <div>
                    <h4>Properties:</h4>
                    <ul>
                      {modalItem.properties.map((prop) => (
                        <li key={prop.index}>{prop.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

        </form>
      </div>
    </>
  );
}