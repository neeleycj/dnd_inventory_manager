import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import cookies from "js-cookie";
import { Link } from "react-router-dom";


export function ScenarioInfo() {
    const [scenario, setScenario] = useState(null);
    const { scenarioId, campaignId } = useParams();
    const makeRequest = useFetch();

    async function getScenario() {
        const res = await makeRequest(`/scenario/${scenarioId}/${campaignId}`, "GET", null, {
            credentials: "same-origin",
            "Content-Type": "application/json",
            "X-CSRFToken": cookies.get("csrftoken"),
            "Accept": "application/json",
        });
        if (res.ok) {
            const scenario = await res.json();
            setScenario(scenario);
            console.log(scenario);
        }
    }
    useEffect(() => {
        getScenario();
    }, []);

    if (!scenario) {
        return <div>Loading...</div>;
    }
    return (
        <div className="scenario-info">
            <button>
                <Link to={`/campaign/${campaignId}/`}>Back to Campaign</Link>
            </button>
            <h1>{scenario.title}</h1>
            <p>{scenario.description}</p>
            <h2>Location</h2>
            <p>{scenario.location}</p>
            <h2>NPCs</h2>
            <ul>
                {scenario.npcs.map((npc, index) => (
                    <li key={index}>{npc}</li>
                ))}
            </ul>
            <h2>Encounters</h2>
            <ul>
                {scenario.encounters.map((encounter, index) => (
                    <li key={index}>{encounter}</li>
                ))}
            </ul>
            <h2>Loot</h2>
            <ul>
                {scenario.loot.map((loot, index) => (
                    <li key={index}>{loot}</li>
                ))}
            </ul>
        </div>
    );
   

}