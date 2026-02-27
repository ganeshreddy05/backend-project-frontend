import { createRoot } from 'react-dom/client';
import './index.css'; // Importing the css file
import App from "./App.jsx";
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import LogInPage from "./pages/Loginpage.jsx";
import ProfilePage from './pages/ProfilePage.jsx';
import Register from './pages/Registration.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Items from './pages/Items.jsx';
import LandingPage from './pages/LandingPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

let rootContainer = document.getElementById('root');

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage /> //public landing page
    },
    {
        path: "/login",
        element: <LogInPage />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <App />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true, //Dashboard is the default at /dashboard
                element: <Dashboard />
            },
            {
                path: "profile",
                element: <ProfilePage />
            },
            {
                path: "items",
                element: <Items />
            }
        ]
    }
])

createRoot(rootContainer).render(<RouterProvider router={router} />);