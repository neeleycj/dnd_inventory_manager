import { useState } from 'react';
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

export function CreateScenario() {
    const [scenarioName, setScenarioName] = useState("");
    const [scenarioDescription, setScenarioDescription] = useState("");
    const [location, setLocation] = useState("");
    const [npcs, setNpcs] = useState([]);
    const [encounters, setEncounters] = useState([]);
    const [loot, setLoot] = useState([]);
    const [notes, setNotes] = useState("");
    const { campaignId } = useParams();
    const navigate = useNavigate();
    const makeRequest = useFetch();

    function addDetail(e, detailType) {
        e.preventDefault()
        const newDetail = e.target.value;
        if (detailType === "npc") {
            setNpcs([...npcs, newDetail]);
        } else if (detailType === "encounter") {
            setEncounters([...encounters, newDetail]);
        } else if (detailType === "loot") {
            setLoot([...loot, newDetail]);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await makeRequest("/scenario/create/", "POST", {
            title: scenarioName,
            description: scenarioDescription,
            location: location,
            npcs: npcs,
            encounters: encounters,
            loot: loot,
            notes: notes,
            campaignId: campaignId,
        });
        if (res.ok) {
            const scenario = await res.json();
            console.log(scenario);
            navigate(`/campaign/${campaignId}/`);
        } else {
            // Handle error
            console.error("Failed to create scenario");
        }
    }

    return (
        <div className="scenario">
            <h1>Scenario</h1>
            <form>
                <label>Scenario Name:</label>
                <input type="text" id="scenario-name" name="scenario-name" value={scenarioName} onChange={e => setScenarioName(e.target.value)} required />
                <label>Description:</label>
                <textarea id="scenario-description" name="scenario-description" value={scenarioDescription} onChange={e => setScenarioDescription(e.target.value)} required></textarea>
                <label>Location:</label>
                <input type="text" id="location" name="location" value={location} onChange={e => setLocation(e.target.value)} required />
                <div>
                <label>NPCs:</label>
                {npcs.map((npc, index) => (
                    <div key={index}>
                        <input type="text" value={npc} onChange={e => {
                            const newNpcs = [...npcs];
                            newNpcs[index] = e.target.value;
                            setNpcs(newNpcs);
                        }} />
                        <button type="button" onClick={() => {
                            const newNpcs = npcs.filter((_, i) => i !== index);
                            setNpcs(newNpcs);
                        }}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={e => addDetail(e, "npc")}>Add NPC</button>
                </div>
                <div>
                <label>Encounters:</label>
                {encounters.map((encounter, index) => (
                    <div key={index}>
                        <input type="text" value={encounter} onChange={e => {
                            const newEncounters = [...encounters];
                            newEncounters[index] = e.target.value;
                            setEncounters(newEncounters);
                        }} />
                        <button type="button" onClick={() => {
                            const newEncounters = encounters.filter((_, i) => i !== index);
                            setEncounters(newEncounters);
                        }}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={e => addDetail(e, "encounter")}>Add Encounter</button>
                </div>
                <div>
                <label>Loot:</label>
                {loot.map((lootItem, index) => (
                    <div key={index}>
                        <input type="text" value={lootItem} onChange={e => {
                            const newLoot = [...loot];
                            newLoot[index] = e.target.value;
                            setLoot(newLoot);
                        }} />
                        <button type="button" onClick={() => {
                            const newLoot = loot.filter((_, i) => i !== index);
                            setLoot(newLoot);
                        }}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={e => addDetail(e, "loot")}>Add Loot</button>
                </div>
                <label>Notes:</label>
                <textarea id="notes" name="notes" value={notes} onChange={e => setNotes(e.target.value)} required></textarea>
                <button type="submit" onClick={handleSubmit}>Submit Scenario</button>
            </form>
            </div>
    )
}