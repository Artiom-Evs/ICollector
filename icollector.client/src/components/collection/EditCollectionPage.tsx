import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCollectionsApi } from "../../hooks/useCollectionsApi";
import { UserCollectionType } from "../../services/CollectionsApiService";
import { FormattedMessage } from "react-intl";
import { CollectionDynamicForm } from "./CollectionDynamicForm";

export function EditCollectionPage() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const collectionsApi = useCollectionsApi();
    const [collection, setCollection] = useState<UserCollectionType>();
    

    useEffect(() => {
        if (!state?.id)
            return;
        collectionsApi.get(state.id)
            .then(response => response.data)
            .then(data => {
                setCollection(data);
            });
    }, [state, collectionsApi]);

    function handleSubmit(updatedCollection: UserCollectionType) {
        collectionsApi.put(collection?.id ?? 0, updatedCollection)
            .then(() => {
                navigate("/collection", {
                    replace: true,
                    state: { id: updatedCollection.id }
                });
            })
    }

    function handleCancel() {
        navigate(-1);
    }

    if (collection === undefined)
        return <p><em><FormattedMessage id="loading" /></em></p>;

    const collectionForm = (
        <CollectionDynamicForm
            collection={collection}
            onSubmit={handleSubmit}
            onCancel={handleCancel} />);

    return (
        <div>
            <div className="card">
                <div className="card-header d-flex justify-content-center">
                    <h1>
                        <FormattedMessage id="edit_collection" />
                    </h1>
                </div>
                <div className="card-body">
                    {collectionForm}
                </div>
            </div>
        </div>
    );
}