import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'vite/modulepreload-polyfill'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { PlayerView } from './pages/PlayerView.jsx'
import { CreateCharacter } from './pages/CreateCharacter.jsx'

const router = createHashRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/',
                element: <PlayerView />
            },
            {
                path: '/character/create',
                element: <CreateCharacter />
            },
        ]
    }
])


ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />,
)
