import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './App.css'
import 'vite/modulepreload-polyfill'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { PlayerView } from './pages/PlayerView.jsx'
import { CreateCharacter } from './pages/CreateCharacter.jsx'
import { Landing } from './pages/Landing.jsx'
import { CreateCampaign } from './pages/CreateCampaign.jsx'
import { CampaignSelection } from './pages/CampaignSelection.jsx'
import { DMView } from './pages/DMView.jsx'
import { CreateScenario } from './pages/CreateScenario.jsx'
import { ScenarioInfo } from './pages/ScenarioInfo.jsx'
import { CreateNote } from './pages/CreateNote.jsx'
import { UpdateCharacter } from './pages/UpdateCharacter.jsx'
import { HandbookPage } from './pages/HandbookPage.jsx'

const router = createHashRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/',
                element: <Landing />
            },
            {
                path: '/character/create/:campaignId',
                element: <CreateCharacter />
            },
            {
                path: '/character/:campaignId',
                element: <PlayerView />
                
            },
            {
                path: '/character/update/:characterId/:campaignId',
                element: <UpdateCharacter />
            },
            {
                path: '/campaign/create/',
                element: <CreateCampaign />

            },
            {
                path: '/campaign/join',
                element: <CampaignSelection />

            },
            {
                path: '/campaign/:campaignId',
                element: <DMView />

            },
            {
                path: '/scenario/create/:campaignId',
                element: <CreateScenario />
            },
            {
                path: '/scenario/:scenarioId/:campaignId',
                element: <ScenarioInfo/>
            },
            {
                path: '/note/create/:campaignId',
                element: <CreateNote />
            },
            {
                path: '/handbook/:campaignId',
                element: <HandbookPage />
            },

        ]
    }
])


ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />,
)
