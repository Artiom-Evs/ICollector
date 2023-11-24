import { useMemo } from "react";
import { SearchApiService } from "./../services/SearchApiService";
import useAuth from "./useAuth";

export function useSearchApi() {
    const { authAxios } = useAuth();
    
    return useMemo(() => new SearchApiService(authAxios), [authAxios]);
}
