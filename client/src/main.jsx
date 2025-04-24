import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'vite/modulepreload-polyfill'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { PlayerView } from './pages/PlayerView.jsx'
import { CreateCharacter } from './pages/CreateCharacter.jsx'
import { Landing } from './pages/Landing.jsx'
import { CreateCampaign } from './pages/CreateCampaign.jsx'
import { CampaignSelection } from './pages/CampaignSelection.jsx'
import { DMView } from './pages/DMView.jsx'

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
                path: '/campaign/create/:campaignId',
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
        ]
    }
])


ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />,
)
