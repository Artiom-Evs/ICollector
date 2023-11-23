import { CollectionItemType } from "../../services/ItemsApiService";
import { useItemsApi } from "../../hooks/useItemsApi";
import { FormattedMessage } from "react-intl";
import { Button, ButtonGroup } from "reactstrap";
import useAuth from "../../hooks/useAuth";
import { ItemDetailsView } from "../shared/ItemDetailsView";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CommentsPanel } from "../comments/ItemCommentsPanel";

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

    const toolbar = userInfo?.id === item.collection.authorId || userInfo?.roles.includes("admin")
        ? renderToolbar(handleEditClicked, handleDeleteClicked)
        : <span />;

    const commentsPanel = <CommentsPanel
        itemId={item.id} />;

    return (
        <div>
            {toolbar}
            <ItemDetailsView
                item={item}
                collection={item.collection} />

            <h2>
                <FormattedMessage id="comments" />
            </h2>
            {commentsPanel}
        </div>
    );
}
