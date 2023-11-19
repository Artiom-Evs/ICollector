import { useMemo } from "react";
import useAuth from "./useAuth";
import { UsersApiService } from "../services/UsersApiService";

export function useUsersApi() {
    const auth = useAuth();

    return useMemo(() => new UsersApiService(auth.authAxios), [auth]);
}
