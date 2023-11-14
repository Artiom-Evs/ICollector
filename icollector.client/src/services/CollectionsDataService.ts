import { AxiosInstance } from "axios";

const apiPath = "/api/collections";

export type UserCollectionType = {
    id: number,
    name: string,
    created: string,
    edited: string,
    authorId: string
}

class CollectionsDataService {
    instance: AxiosInstance;

    constructor(instance: AxiosInstance) {
        this.instance = instance;
    }

    getAll(orderBy: string = "", descending: boolean = false, page: number = 1, pageSize: number = 100) {
        return this.instance.get(apiPath, {
            params: {
                orderBy, descending, page, pageSize
        }});
    }

    get(id: number) {
        return this.instance.get(`${apiPath}?id=${id}`);
    }

    post(data: UserCollectionType) {
        return this.instance.post(apiPath, data);
    }

    update(id: number, data: UserCollectionType) {
        return this.instance.put(`${apiPath}?id=${id}`, data);
    }

    delete(id: number) {
        return this.instance.delete(`${apiPath}?id=${id}`);
    }
}

export default CollectionsDataService;
