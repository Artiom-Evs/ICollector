import { useMemo } from "react";
import ItemsDataService from "../services/ItemsDataService";
import useAuth from "./useAuth";

export function useItemsApi() {
    const auth = useAuth();

    return useMemo(() => new ItemsDataService(auth.authAxios), [auth]);
}