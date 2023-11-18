import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { CollectionItemType } from "../../services/ItemsApiService";
import { useItemsApi } from "../../hooks/useItemsApi";

export function DeleteItemPage() {
    const { state } = useLocation();
    const [item, setItem] = useState<CollectionItemType>();
    const itemsApi = useItemsApi();
    const navigate = useNavigate();

    useEffect(() => {
        itemsApi.get(state?.id ?? 0)
            .then(response => response.data)
            .then(data => setItem(data))
            .catch(error => console.error(error));
    }, [itemsApi, state]);

    function handleDeleteClicked() {
        itemsApi.delete(item?.id ?? 0);
        navigate(-1);
    }

    function handleCancelClicked() {
        navigate(-1);
    }

    if (item === undefined) {
        return <p><em><FormattedMessage id="loading" /></em></p>;
    }

    return (
        <div>
            <h1>
                <FormattedMessage id="delete_item" />
            </h1>

            <dl>
                <dt>
                    <FormattedMessage id="identifier" />
                </dt>
                <dd>{item.id}</dd>
                <dt>
                    <FormattedMessage id="name" />
                </dt>
                <dd>{item.name}</dd>
                <dt>
                    <FormattedMessage id="author" />
                </dt>
                <dd>{item.collection.authorName}</dd>
                <dt>
                    <FormattedMessage id="collection" />
                </dt>
                <dd>{item.collection.name}</dd>
            </dl>

            <p>
                <FormattedMessage id="warning_before_item_deletion" />
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