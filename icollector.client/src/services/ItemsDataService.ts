import { AxiosInstance } from "axios";

const apiPath = "/api/items";

export type CollectionItemType = {
    id: number,
    name: string,
    created: string,
    edited: string,
    collectionId: string
}

class ItemsDataService {
    instance: AxiosInstance;

    constructor(instance: AxiosInstance) {
        this.instance = instance;
    }

    getAll(orderBy: string = "", descending: boolean = false, page: number = 1, pageSize: number = 100) {
        return this.instance.get(apiPath, {
            params: {
                orderBy, descending, page, pageSize
            }
        });
    }

    get(id: number) {
        return this.instance.get(`${apiPath}?id=${id}`);
    }

    post(data: CollectionItemType) {
        return this.instance.post(apiPath, data);
    }

    update(id: number, data: CollectionItemType) {
        return this.instance.put(`${apiPath}?id=${id}`, data);
    }

    delete(id: number) {
        return this.instance.delete(`${apiPath}?id=${id}`);
    }
}

export default ItemsDataService;
