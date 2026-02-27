import { Navigate } from "react-router-dom";
import { getAccessToken } from "../utils/tokens.js";

// ProtectedRoute - redirects to landing page if user is not authenticated
// Wrap any route that requires login with this component
const ProtectedRoute = ({ children }) => {

    const accessToken = getAccessToken();

    //if no access token found, redirect to landing page
    if (!accessToken) {
        return <Navigate to="/" replace />;
    }

    //if token exists, render the children (the protected page)
    return children;
};

export default ProtectedRoute;
