import { useLocation, Navigate } from 'react-router-dom';

function UnAuth({ children }) {
    const token = JSON.parse(localStorage.getItem("credentials"));
    const location = useLocation();
    if (token && token.isLoggedIn) {
        return <Navigate to="/" state={{ from: location }} replace />;

    }
    return children
}

export default UnAuth