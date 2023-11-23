import { AxiosInstance, AxiosResponse } from "axios";
import { UserCollectionType } from "./CollectionsApiService";

const apiPath = "/api/items";

export interface CollectionItemType {
    id: number,
    name: string,
    created: string,
    edited: string,
    collection: UserCollectionType,
    commentsCount: number,
    number1: number | null,
    number2: number | null,
    number3: number | null
    text1: string | null,
    text2: string | null,
    text3: string | null,
    multiline1: string | null,
    multiline2: string | null,
    multiline3: string | null
}

export interface CollectionItemRequestType {
    id: number,
    name: string,
    collectionId: number,
    number1: number | null,
    number2: number | null,
    number3: number | null
    text1: string | null,
    text2: string | null,
    text3: string | null,
    multiline1: string | null,
    multiline2: string | null,
    multiline3: string | null
}

class ItemsApiService {
    instance: AxiosInstance;

    constructor(instance: AxiosInstance) {
        this.instance = instance;
    }

    getAll(orderBy: string = "", descending: boolean = false, page: number = 1, pageSize: number = 100): Promise<AxiosResponse<CollectionItemType[]>> {
        return this.instance.get(apiPath, {
            params: {
                orderBy, descending, page, pageSize
            }
        });
    }

    get(id: number): Promise<AxiosResponse<CollectionItemType>> {
        return this.instance.get(`${apiPath}/${id}`);
    }

    post(data: CollectionItemRequestType): Promise<AxiosResponse<CollectionItemType>> {
        return this.instance.post(apiPath, data);
    }

    put(id: number, data: CollectionItemRequestType): Promise<AxiosResponse> {
        return this.instance.put(`${apiPath}/${id}`, data);
    }

    delete(id: number): Promise<AxiosResponse> {
        return this.instance.delete(`${apiPath}/${id}`);
    }
}

export default ItemsApiService;
