import { useMemo } from "react";
import ItemsApiService from "../services/ItemsApiService";
import useAuth from "./useAuth";

export function useItemsApi() {
    const auth = useAuth();

    return useMemo(() => new ItemsApiService(auth.authAxios), [auth]);
}