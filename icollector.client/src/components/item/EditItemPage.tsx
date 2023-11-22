import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { useItemsApi } from "../../hooks/useItemsApi";
import { CollectionItemRequestType, CollectionItemType } from "../../services/ItemsApiService";
import { ItemDynamicForm } from "./ItemDynamicForm";

export function EditItemPage() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const itemsApi = useItemsApi();
    const [item, setItem] = useState<CollectionItemType>();
    
    useEffect(() => {
        if (!state?.id)
            return;
        itemsApi.get(state.id)
            .then(response => response.data)
            .then(data => setItem(data))
            .catch(error => console.error(error));
    }, [state, itemsApi]);

    function handleSubmit(item: CollectionItemRequestType) {
        itemsApi.put(state.id, item)
            .then(() => {
                navigate("/item", {
                    replace: true,
                    state: { id: state.id }
                });
            })
            .catch(error => console.error(error));
    }

    function handleCancel() {
        navigate(-1);
    }

    if (item === undefined)
        return <p><em><FormattedMessage id="loading" /></em></p>;

    const itemForm = (
        <ItemDynamicForm
            item={item}
            collection={item.collection}
            onSubmit={handleSubmit}
            onCancel={handleCancel} />
    )
    
    return (
        <div>
            <div className="card">
                <div className="card-header d-flex justify-content-center">
                    <h1>
                        <FormattedMessage id="edit_item" />
                    </h1>
                </div>
                <div className="card-body">
                    {itemForm}
                </div>
            </div>
        </div>
    );
}