import { useEffect, useState } from 'react';
import CharacterSheet from '../components/CharacterSheet';
import { Link, useParams } from 'react-router-dom';
import { useFetch } from "../hooks/useFetch";
import cookies from "js-cookie";

export function PlayerView() {
  const { campaignId } = useParams();

  const [character, setCharacter] = useState(null);
  const [user, setUser] = useState(null);
  const [campaign, setCampaign] = useState(null);

  const [modalItem, setModalItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function getCharacter() {
    const res = await fetch(`/character/${campaignId}/`, {
      credentials: "same-origin",
    });

    if (res.ok) {
      const characterData = await res.json();
      setCharacter(characterData);
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
      const campaignData = await res.json();
      setCampaign(campaignData);
    }
  }

  useEffect(() => {
    getCampaign();
    getCharacter();
  }, []);

  async function handleEquipmentClick(itemName) {
    try {
      console.log("Clicked:", itemName); // ✅ for debugging
      const formattedName = itemName
        .toLowerCase()
        .replace(/[',()]/g, '') // Remove commas, apostrophes, parentheses
        .replace(/ /g, "-");    // Replace spaces with hyphens

      const url = `https://www.dnd5eapi.co/api/2014/equipment/${formattedName}`;
      console.log("Fetching URL:", url); // ✅ for debugging

      const res = await fetch(url);

      if (res.ok) {
        const data = await res.json();
        console.log("Fetched item:", data); // ✅ for debugging
        setModalItem(data);
        setIsModalOpen(true);
      } else {
        console.error('Failed fetch: ', res.status);
      }
    } catch (error) {
      console.error('Error fetching item info for:', itemName, error);
    }
  }



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
        <button><Link to={`/campaign/join`}>Back to Campaign Selection</Link></button>
        <button><Link to={`/character/update/${character.id}/${campaignId}/`}>Update Character</Link></button>
        <button><Link to={`/handbook/${campaignId}`}>Player Handbook</Link></button>
      </div>

      <div className="character-sheet-wrapper">
        {character && (
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
            onEquipmentClick={handleEquipmentClick} // 🆕 pass click handler

          />
        )}
        <div className="note-section">
          <div className="note-list">
            <h2>Notes</h2>
            {campaign.notes.map((note) => (
              <div key={note.id} className="note-card">
                <h3>{note.title}</h3>
                <p>{note.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* === Modal === */}
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
    </>
  );
}
