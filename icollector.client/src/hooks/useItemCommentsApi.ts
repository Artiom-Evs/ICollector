import { useMemo } from "react";
import useAuth from "./useAuth";
import ItemCommentsApiService from "../services/ItemCommentsApiService";

export function useItemCommentsApi() {
    const auth = useAuth();

    return useMemo(() => new ItemCommentsApiService(auth.authAxios), [auth]);
}