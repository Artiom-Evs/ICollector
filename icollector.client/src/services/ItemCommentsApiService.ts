import { AxiosInstance, AxiosResponse } from "axios";
import { CollectionItemType } from "./ItemsApiService";

const apiPath = "/api/itemcomments";

export interface ItemCommentType {
    id: number,
    item: CollectionItemType,
    itemId: number,
    authorId: string,
    authorName: string,
    created: string,
    edited: string,
    text: string
}

export interface ItemCommentRequestType {
    id: number,
    itemId: number,
    text: string
}

class ItemCommentsApiService {
    instance: AxiosInstance;

    constructor(instance: AxiosInstance) {
        this.instance = instance;
    }

    getAll(itemId: number = 0, page: number = 1, pageSize: number = 0): Promise<AxiosResponse<ItemCommentType[]>> {
        return this.instance.get(apiPath, {
            params: {
                itemId, page, pageSize
            }
        });
    }

    get(id: number): Promise<AxiosResponse<ItemCommentType>> {
        return this.instance.get(`${apiPath}/${id}`);
    }

    post(data: ItemCommentRequestType): Promise<AxiosResponse<ItemCommentType>> {
        return this.instance.post(apiPath, data);
    }

    put(id: number, data: ItemCommentRequestType): Promise<AxiosResponse> {
        return this.instance.put(`${apiPath}/${id}`, data);
    }

    delete(id: number): Promise<AxiosResponse> {
        return this.instance.delete(`${apiPath}/${id}`);
    }
}

export default ItemCommentsApiService;
