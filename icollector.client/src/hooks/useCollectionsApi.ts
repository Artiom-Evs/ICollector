import { useMemo } from "react";
import CollectionsDataService from "../services/CollectionsDataService";
import useAuth from "./useAuth";

export function useCollectionsApi() {
    const auth = useAuth();

    return useMemo(() => new CollectionsDataService(auth.authAxios), [auth]);
}