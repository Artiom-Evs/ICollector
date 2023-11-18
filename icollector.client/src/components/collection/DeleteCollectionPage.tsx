import { UserCollectionType } from "../../services/CollectionsApiService";
import { useEffect, useState } from "react";
import { useCollectionsApi } from "../../hooks/useCollectionsApi";
import { FormattedMessage } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

export function DeleteCollectionPage() {
    const { state } = useLocation();
    const [collection, setCollection] = useState<UserCollectionType>();
    const collectionsApi = useCollectionsApi();
    const navigate = useNavigate();

    useEffect(() => {
        collectionsApi.get(parseInt(state.id ?? "0"))
            .then(response => response.data)
            .then((data: UserCollectionType) => setCollection(data))
            .catch(error => console.error(error));
    }, [collectionsApi, state]);

    function handleDeleteClicked() {
        collectionsApi.delete(collection?.id ?? 0);
        navigate(-1);
    }

    function handleCancelClicked() {
        navigate(-1);
    }

    if (collection === undefined) {
        return <p><em><FormattedMessage id="loading" /></em></p>;
    }

    return (
        <div>
            <h1>
                <FormattedMessage id="delete_collection" />
            </h1>

            <dl>
                <dt>
                    <FormattedMessage id="identifier" />
                </dt>
                <dd>{collection.id}</dd>
                <dt>
                    <FormattedMessage id="name" />
                </dt>
                <dd>{collection.name}</dd>
                <dt>
                    <FormattedMessage id="description" />
                </dt>
                <dd>{collection.description}</dd>
                <dt>
                    <FormattedMessage id="author" />
                </dt>
                <dd>{collection.authorName}</dd>
                <dt>
                    <FormattedMessage id="items_count" />
                </dt>
                <dd>{collection.items.length}</dd>
            </dl>

            <p>
                <FormattedMessage id="warning_before_collection_deletion" />
            </p>
            
            <div>
                <Button className="me-1" onClick={handleDeleteClicked}>
                    <FormattedMessage id="delete" />
                </Button>
                <Button onClick={handleCancelClicked}>
                    <FormattedMessage id="cancel" />
                </Button>
            </div>
        </div>
    )
}