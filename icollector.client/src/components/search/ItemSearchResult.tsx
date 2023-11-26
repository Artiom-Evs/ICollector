import { Link, useNavigate } from "react-router-dom";
import { CollectionItemType } from "../../services/ItemsApiService";
import { FormattedMessage } from "react-intl";
import { MouseEvent } from "react";

interface ItemSearchResultProps {
    item: CollectionItemType
}

export function ItemSearchResult(props: ItemSearchResultProps) {
    const navigate = useNavigate();

    function handleItemClicked(e: MouseEvent) {
        e.preventDefault();
        navigate("/item", { state: { id: props.item.id } });
    }

    function handleUserClicked(e: MouseEvent) {
        e.preventDefault();
        navigate("/user", { state: { id: props.item.collection.authorId } });
    }

    return (
        <div className="card mb-2">
            <div className="card-body row">
                <div className="col-sm-8">
                    <Link to="#" onClick={handleItemClicked}>
                        {props.item.name}
                    </Link>
                </div>
                <div className="col-sm-4">
                    <FormattedMessage id="author_with_name" values={{ n: "" }} />
                    <Link to="#" onClick={handleUserClicked}>
                        {props.item.collection.authorName}
                    </Link>
                    <br />
                    <FormattedMessage id="created_with_date" values={{ d: new Date(props.item.created) }} />
                    <br />
                    <FormattedMessage id="edited_with_date" values={{ d: new Date(props.item.edited) }} />
                </div>
            </div>
        </div>
    );
}