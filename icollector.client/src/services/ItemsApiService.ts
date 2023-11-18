import { AxiosInstance, AxiosResponse } from "axios";
import { UserCollectionType } from "./CollectionsApiService";

const apiPath = "/api/items";

export type CollectionItemType = {
    id: number,
    name: string,
    created: string,
    edited: string,
    collection: UserCollectionType
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

    post(data: CollectionItemType): Promise<AxiosResponse<CollectionItemType>> {
        return this.instance.post(apiPath, data);
    }

    update(id: number, data: CollectionItemType): Promise<AxiosResponse> {
        return this.instance.put(`${apiPath}/${id}`, data);
    }

    delete(id: number): Promise<AxiosResponse> {
        return this.instance.delete(`${apiPath}/${id}`);
    }
}

export default ItemsApiService;
