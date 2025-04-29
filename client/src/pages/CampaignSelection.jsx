import { Link } from 'react-router-dom'
import { useState, useEffect  } from "react";
import { useNavigate } from 'react-router-dom';
import { useFetch } from "../hooks/useFetch";
import cookies from "js-cookie";


export function CampaignSelection() {
    const [campaignId, setCampaignId] = useState("");
    const [campaigns, setCampaigns] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const makeRequest = useFetch();

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
    async function getCampaigns(){
        const res = await makeRequest("/campaign/list/", "GET", null, {
            credentials: "same-origin",
            "Content-Type": "application/json",
            "X-CSRFToken": cookies.get("csrftoken"),
            "Accept": "application/json",
        });
        if (res.ok){
            const campaigns = await res.json();
            setCampaigns(campaigns);
            console.log(campaigns);
        }
    }
    async function getUser() {
        const makeRequest = useFetch();
                const res = await makeRequest("/user/", "GET", null, {
                    credentials: "same-origin",
                    "Content-Type": "application/json",
                    "X-CSRFToken": cookies.get("csrftoken"),
                    "Accept": "application/json",
                });
                if (res.ok){
                    const user = await res.json();
                    setUser(user);
                    console.log(user);
                }
    }
    
    useEffect(() => {
        getUser();
        getCampaigns();
    }, []);

  return (
    <div className="campaign-selection">
        <button>
        <Link to="/">Back Home</Link>
        </button>
      <h1>Select a Campaign</h1>
      <p>Choose existing campaign or join a new one.</p>
        <div>
        <h2>Available Campaigns</h2>
        <ul>
            {campaigns.map((campaign) => (
                <li key={campaign.id}>
                    {campaign.dm === user.username?(
                        <Link to={`/campaign/${campaign.id}/`}>{campaign.name}</Link>
                ): (
                        <Link to={`/character/${campaign.id}/`}>{campaign.name}</Link>
                    )}
                </li>
            ))}
        </ul>
        </div>
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