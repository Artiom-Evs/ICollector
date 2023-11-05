import { useContext } from "react";
import { AuthContext, AuthContextType } from "../providers/AuthProvider";

function useAuth(): AuthContextType {
    const authContext = useContext(AuthContext);

    if (authContext === null) {
        throw new Error("'useAuth' should be used within '<AuthProvider>'.");
    }

    return authContext;
}

export default useAuth;
