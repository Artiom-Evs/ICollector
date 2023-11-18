import useAuth from "../../hooks/useAuth"
import { Navigate } from "react-router-dom";

export interface PrivateRouteProps {
    element: JSX.Element
}

export function PrivateRoute(props: PrivateRouteProps) {
    const { isAuthorized } = useAuth();
    
    if (!isAuthorized) {
        return <Navigate replace to="/" />
    }

    return props.element;
}