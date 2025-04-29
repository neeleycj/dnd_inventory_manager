import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useFetch } from "../hooks/useFetch";
import cookies from "js-cookie";
import { Link } from 'react-router-dom';

export function DMView() {
    const { campaignId } = useParams();
    const [campaign, setCampaign] = useState(null);
    console.log("Campaign ID:", campaignId);

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
    }, []);
    
    if (!campaign) {
        return <div>Loading...</div>;
    }

    return (
    <>
        <div className="dm-view">
        <button>
        <Link to="/">Back Home</Link>
        </button>
            
        <h1>DM View</h1>
        <p>This is the DM view where you can manage your campaign.</p>
            <div className='campaign-details'>
                <h2>Campaign Details</h2>
                <p>Name: {campaign.name}</p>
                <p>Description: {campaign.description}</p>
            </div>
        <div className='character-list'>
            <h2>Characters</h2>
                {campaign.characters.map((character) => (
                    <div key={character.id} className="character-card">
                    <h3>{character.name}</h3>
                    <p>Level: {character.level}</p>
                    <p>Class: {character.class_type}</p>
                </div>
                ))}
        </div>
        <div className='scenario-list'>
            <h2>Scenarios</h2>
                <button>
                <Link to={`/scenario/create/${campaignId}/`}>Create Scenario</Link>
                </button>
                {campaign.scenarios.map((scenario) => (
                    <div key={scenario.id} className="scenario-card">
                    <Link to={`/scenario/${scenario.id}/${campaignId}`}><h3>{scenario.title}</h3></Link>
                    <p>Description: {scenario.description}</p>
                    
                </div>
                ))}
            </div>

            <div className='note-list'>
            <h2>Notes</h2>
                
                <button>
                <Link to={`/note/create/${campaignId}/`}>Create Note</Link>
                </button>
                {campaign.notes.map((note) => (
                    <div key={note.id} className="note-card">
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                </div>
                ))}
            </div>
        <p>Campaign ID: {campaignId}</p>
        </div>
        
    </>
    );
}





