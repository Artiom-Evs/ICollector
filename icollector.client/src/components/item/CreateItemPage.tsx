import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { useItemsApi } from "../../hooks/useItemsApi";
import { CollectionItemRequestType, CollectionItemType } from "../../services/ItemsApiService";
import { ItemDynamicForm } from "./ItemDynamicForm";
import { useCollectionsApi } from "../../hooks/useCollectionsApi";
import { UserCollectionType } from "../../services/CollectionsApiService";

export function CreateItemPage() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const collectionsApi = useCollectionsApi();
    const itemsApi = useItemsApi();
    const [collection, setCollection] = useState<UserCollectionType>();
    const [item,] = useState<CollectionItemType>({} as CollectionItemType);

    useEffect(() => {
        collectionsApi.get(state.collectionId ?? 0)
            .then(response => response.data)
            .then(data => setCollection(data))
            .catch(error => console.error(error));
    }, [collectionsApi, state]);

    function handleSubmit(item: CollectionItemRequestType) {
        itemsApi.post(item)
            .then(response => response.data)
            .then(data => {
                navigate("/item", {
                    replace: true,
                    state: { id: data.id }
                });
            })
            .catch(error => console.error(error));
    }

    function handleCancel() {
        navigate(-1);
    }

    if (collection === undefined)
        return <p><em><FormattedMessage id="loading" /></em></p>;

    const itemForm = (
        <ItemDynamicForm
            item={item}
            collection={collection}
            onSubmit={handleSubmit}
            onCancel={handleCancel} />
    )

    return (
        <div>
            <div className="card">
                <div className="card-header d-flex justify-content-center">
                    <h1>
                        <FormattedMessage id="add_new_item" />
                    </h1>
                </div>
                <div className="card-body">
                    {itemForm} 
                </div>
            </div>
        </div>
    );
}