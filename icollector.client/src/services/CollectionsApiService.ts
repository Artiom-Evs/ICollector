import { AxiosInstance, AxiosResponse } from "axios";
import { CollectionItemType } from "./ItemsApiService";

const apiPath = "/api/collections";

export interface UserCollectionType {
    id: number,
    name: string,
    description: string,
    created: string,
    edited: string,
    authorId: string,
    authorName: string,
    items: CollectionItemType[],

    number1Name: string | null,
    number2Name: string | null,
    number3Name: string | null,
    text1Name: string | null,
    text2Name: string | null,
    text3Name: string | null,
    multiline1Name: string | null,
    multiline2Name: string | null,
    multiline3Name: string | null,
}

class CollectionsApiService {
    instance: AxiosInstance;

    constructor(instance: AxiosInstance) {
        this.instance = instance;
    }

    getAll(authorId: string, orderBy: string = "", descending: boolean = false, page: number = 1, pageSize: number = 100): Promise<AxiosResponse<UserCollectionType[]>> {
        return this.instance.get(apiPath, {
            params: {
                authorId, orderBy, descending, page, pageSize
        }});
    }

    get(id: number): Promise<AxiosResponse<UserCollectionType>> {
        return this.instance.get(`${apiPath}/${id}`);
    }

    post(data: UserCollectionType): Promise<AxiosResponse<UserCollectionType>> {
        return this.instance.post(apiPath, data);
    }

    put(id: number, data: UserCollectionType): Promise<AxiosResponse> {
        return this.instance.put(`${apiPath}/${id}`, data);
    }

    delete(id: number): Promise<AxiosResponse> {
        return this.instance.delete(`${apiPath}/${id}`);
    }
}

export default CollectionsApiService;
