import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useNavigate, Link } from "react-router-dom";

export function CreateCampaign() {
    const [campaignName, setCampaignName] = useState("");
    const [campaignDescription, setCampaignDescription] = useState("");
    const navigate = useNavigate();
    const makeRequest = useFetch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await makeRequest("/campaign/create/", "POST", {
            name: campaignName,
            description: campaignDescription,
        });
        if (res.ok) {
            const campaign = await res.json();
            console.log(campaign);
         
            navigate(`/campaign/${campaign.id}/`);
        } else {
            // Handle error
            console.error("Failed to create campaign");
        }
    };
    
    return (
    <div className="create-campaign">
      <button>
        <Link to="/">Back Home</Link>
        </button>
      <h1>Create a New Campaign</h1>
      <form>
        <label>Campaign Name:</label>
        <input type="text" id="campaign-name" name="campaign-name" value={campaignName} onChange={e => setCampaignName(e.target.value)} required />
        
        <label>Description:</label>
        <textarea id="campaign-description" name="campaign-description" value={campaignDescription} onChange={e => setCampaignDescription(e.target.value)} required></textarea>
        
        <button type="submit" onClick={handleSubmit}>Create Campaign</button>
      </form>
    </div>
  );
}