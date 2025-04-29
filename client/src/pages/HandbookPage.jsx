import Handbook from "../components/Handbook";
import { useParams, Link } from "react-router-dom";

export function HandbookPage() {
    const { campaignId } = useParams();
    return (
        <>
            <div className="handbook-page">
            <button>
                <Link to={`/character/${campaignId}/`}>Back to Character</Link>
            </button>
                <h1 className="page-title">Player Handbook</h1>
                <Handbook />
            </div>
        </>
    );
}
