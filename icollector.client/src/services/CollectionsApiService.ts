import { AxiosInstance } from "axios";
import { CollectionItemType } from "./ItemsApiService";

const apiPath = "/api/collections";

export type UserCollectionType = {
    id: number,
    name: string,
    description: string,
    created: string,
    edited: string,
    authorId: string,
    authorName: string,
    items: CollectionItemType[]
}

class CollectionsApiService {
    instance: AxiosInstance;

    constructor(instance: AxiosInstance) {
        this.instance = instance;
    }

    getAll(authorId: string, orderBy: string = "", descending: boolean = false, page: number = 1, pageSize: number = 100) {
        return this.instance.get(apiPath, {
            params: {
                authorId, orderBy, descending, page, pageSize
        }});
    }

    get(id: number) {
        return this.instance.get(`${apiPath}/${id}`);
    }

    post(data: UserCollectionType) {
        return this.instance.post(apiPath, data);
    }

    update(id: number, data: UserCollectionType) {
        return this.instance.put(`${apiPath}/${id}`, data);
    }

    delete(id: number) {
        return this.instance.delete(`${apiPath}/${id}`);
    }
}

export default CollectionsApiService;
