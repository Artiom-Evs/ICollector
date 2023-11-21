import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCollectionsApi } from "../../hooks/useCollectionsApi";
import { UserCollectionType } from "../../services/CollectionsApiService";
import { FormattedMessage } from "react-intl";
import { CollectionDynamicForm } from "./CollectionDynamicForm";

export function CreateCollectionPage() {
    const navigate = useNavigate();
    const collectionsApi = useCollectionsApi();
    const [collection, ] = useState<UserCollectionType>({} as UserCollectionType);
    
    function handleSubmit(collection: UserCollectionType) {
        collectionsApi.post(collection)
            .then(response => response.data)
            .then(data => {
                navigate("/collection", {
                    replace: true,
                    state: { id: data.id }
                });
            })
            .catch(error => console.error(error));
    }

    function handleCancel() {
        navigate(-1);
    }

    const collectionForm = (
        <CollectionDynamicForm
            collection={collection}
            onSubmit={handleSubmit}
            onCancel={handleCancel} /> );

    return (
        <div>
            <div className="card">
                <div className="card-header d-flex justify-content-center">
                    <h1>
                        <FormattedMessage id="create_new_collection" />
                    </h1>
                </div>
                <div className="card-body">
                    {collectionForm}
                </div>
            </div>
        </div>
    );
}