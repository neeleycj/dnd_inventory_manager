import { useParams } from 'react-router-dom';

export function DMView() {
    const { campaignId } = useParams();
    console.log("Campaign ID:", campaignId);

    return (<div>Campaign ID: {campaignId}
        <div className="dm-view">
      <h1>DM View</h1>
      <p>This is the DM view where you can manage your campaign.</p>
      
    </div>
    </div>
    );
}





