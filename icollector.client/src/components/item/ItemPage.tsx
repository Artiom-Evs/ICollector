import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CollectionItemType } from "../../services/ItemsApiService";
import { useItemsApi } from "../../hooks/useItemsApi";
import { FormattedMessage } from "react-intl";
import { Button, ButtonGroup } from "reactstrap";
import useAuth from "../../hooks/useAuth";

function renderToolbar(onEditClicked: () => void, onDeleteClicked: () => void) {
    return (
        <div className="d-flex justify-content-end">
            <ButtonGroup>
                <Button onClick={onEditClicked}>
                    <FormattedMessage id="edit" />
                </Button>
                <Button onClick={onDeleteClicked}>
                    <FormattedMessage id="delete" />
                </Button>
            </ButtonGroup>
        </div>
    )
}

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
    const { userInfo } = useAuth();
    const navigate = useNavigate();
    const [item, setItem] = useState<CollectionItemType>();
    const itemsApi = useItemsApi();

    useEffect(() => {
        itemsApi.get(parseInt(state.id ?? "0"))
            .then(response => response.data)
            .then((data: CollectionItemType) => setItem(data))
            .catch(error => console.error(error));
    }, [itemsApi, state]);

    function handleEditClicked() {
        navigate("/item/edit", {
            state: {
                id: item?.id ?? 0
            }
        });
    }

    function handleDeleteClicked() {
        navigate("/item/delete", {
            state: {
                id: item?.id ?? 0
            }
        });
    }

    if (item === undefined) {
        return <p><em><FormattedMessage id="loading" /></em></p>;
    }

    return (
        <div>
            {userInfo?.id === item.collection.authorId && renderToolbar(handleEditClicked, handleDeleteClicked)}
            {renderItem(item)}
        </div>
    );
}
