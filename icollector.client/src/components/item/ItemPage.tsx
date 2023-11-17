import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { CollectionItemType } from "../../services/ItemsDataService";
import { useItemsApi } from "../../hooks/useItemsApi";

function renderItem(item: CollectionItemType) {
    return (
        <div>
            <dl>
                <dt>ID</dt>
                <dd>{item.id}</dd>
                <dt>Name</dt>
                <dd>{item.name}</dd>
                <dt>Author</dt>
                <dd>{item.collection.authorName}</dd>
                <dt>Collection</dt>
                <dd>{item.collection.name}</dd>
            </dl>
        </div>
    );
}

export function ItemPage() {
    const { state } = useLocation();
    const [item, setItem] = useState<CollectionItemType>();
    const itemsApi = useItemsApi();

    useEffect(() => {
        itemsApi.get(parseInt(state.id ?? "0"))
            .then(response => response.data)
            .then((data: CollectionItemType) => setItem(data))
            .catch(error => console.error(error));
    }, [itemsApi, state]);

    const content = item === undefined
        ? <p><em>Loading...</em></p>
        : renderItem(item);

    return content;
}