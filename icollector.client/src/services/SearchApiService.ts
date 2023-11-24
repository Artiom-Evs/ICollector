import { AxiosInstance, AxiosResponse } from "axios";
import { CollectionItemType } from "./ItemsApiService";
import { ItemCommentType } from "./ItemCommentsApiService";
import { UserCollectionType } from "./CollectionsApiService";

const ApiPrefix = "/api/search";
const ApiPaths = {
    Items: `${ApiPrefix}/items`,
    ItemComments: `${ApiPrefix}/itemcomments`,
    Collections : `${ApiPrefix}/collections`,
}

export class SearchApiService {
    instance: AxiosInstance;

    constructor(instance: AxiosInstance) {
        this.instance = instance;
    }

    searchItems(text: string): Promise<AxiosResponse<CollectionItemType[]>> {
        return this.instance.get(ApiPaths.Items, {
            params: { text }
        });
    }

    searchItemComments(text: string): Promise<AxiosResponse<ItemCommentType[]>>  {
        return this.instance.get(ApiPaths.ItemComments, {
            params: { text }
        });
    }

    searchCollections(text: string): Promise<AxiosResponse<UserCollectionType[]>>  {
        return this.instance.get(ApiPaths.Collections, {
            params: { text }
        });
    }
}