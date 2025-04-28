import Handbook from "../components/Handbook";


export function HandbookPage() {
    return (
        <>
            <div className="handbook-page">
                <h1>Player Handbook</h1>
                <p>Welcome to the Player Handbook! Here you can find all the resources you need for your D&D adventures.</p>
                <Handbook />
            </div>
        </>
    );
}




// import { Link } from 'react-router-dom'

// export function Landing() {
//   return (
//     <div className="landing-page">
//       <h1>Welcome to the Character Sheet App</h1>
//       <p>Your one-stop solution for managing your D&D characters.</p>
//       <button className="get-started-button">
//         <Link to="/campaign/create/">Create Campaign</Link>
//       </button>
//       <button className="get-started-button">
//         <Link to="/campaign/join/">Join Campaign</Link>
//       </button>
//     </div>
//   );
// }