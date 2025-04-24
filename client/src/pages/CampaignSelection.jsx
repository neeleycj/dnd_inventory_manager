import { Link } from 'react-router-dom'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


export function CampaignSelection() {
    const [campaignId, setCampaignId] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Assuming you have a function to fetch campaign details
        const res = await fetch(`/campaign/check/${campaignId}/`);
        if (res.ok) {
            const campaign = await res.json();
            console.log(campaign);
            navigate(`/character/create/${campaign.id}/`);
        } else {
            // Handle error
            console.log("Failed to join campaign");
        }
    };
  return (
    <div className="campaign-selection">
      <h1>Select a Campaign</h1>
      <p>Choose existing campaign or join a new one.</p>
      <button className="get-started-button">
        <Link to="/character/">Campaign Placeholder</Link>
      </button>

      <form>
        <label>Campaign ID:</label>
        <input type="text" id="campaign-id" name="campaign-id" value={campaignId} onChange={e => setCampaignId(e.target.value)} required/>
      <button className="get-started-button" onClick={handleSubmit}>
        Join Campaign
      </button>
      </form>
    </div>
  );
}