import { useMemo } from "react";
import CollectionsApiService from "../services/CollectionsApiService";
import useAuth from "./useAuth";

export function useCollectionsApi() {
    const auth = useAuth();

    return useMemo(() => new CollectionsApiService(auth.authAxios), [auth]);
}