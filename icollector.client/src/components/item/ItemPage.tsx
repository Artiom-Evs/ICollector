import { Link, useLocation, useNavigate } from "react-router-dom";
import { MouseEvent, useEffect, useState } from "react";
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

function renderItem(item: CollectionItemType, onUserClick: (e: MouseEvent) => void, onCollectionClick: (e: MouseEvent) => void) {
    return (
        <div>
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
                <dd>
                    <Link to="#" onClick={onUserClick}>
                        {item.collection.authorName}
                    </Link>
                </dd>
                <dt>
                    <FormattedMessage id="collection" />
                </dt>
                <dd>
                    <Link to="#" onClick={onCollectionClick}>
                        {item.collection.name}
                    </Link>
                </dd>
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

    function handleUserClicked(e: MouseEvent) {
        e.preventDefault();
        navigate("/user", { state: {
            id: item?.collection.authorId
        }});
    }

    function handleCollectionClicked(e: MouseEvent) {
        e.preventDefault();
        navigate("/collection", { state: {
            id: item?.collection.id
        }});
    }

    if (item === undefined) {
        return <p><em><FormattedMessage id="loading" /></em></p>;
    }

    const toolbar = userInfo?.id === item.collection.authorId || userInfo?.roles.includes("admin")
        ? renderToolbar(handleEditClicked, handleDeleteClicked)
        : <span />;

    return (
        <div>
            {toolbar}
            {renderItem(item, handleUserClicked, handleCollectionClicked)}
        </div>
    );
}
