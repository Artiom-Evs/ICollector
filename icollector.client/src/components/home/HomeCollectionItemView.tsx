import { FormattedMessage } from "react-intl";
import { CollectionItemType } from "../../services/ItemsApiService";
import { Link, useNavigate } from "react-router-dom";
import { MouseEvent } from "react";

interface HomeCollectionItemViewProps {
    item: CollectionItemType
}

export function HomeCollectionItemView(props: HomeCollectionItemViewProps) {
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
                <div className="col-sm-2" style={{ textAlign: "right" }}>
                    <p>
                        <FormattedMessage id="likes_with_number" values={{ n: 0 }} />
                        <br />
                        <FormattedMessage id="comments_with_number" values={{ n: 0 }} />
                    </p>
                </div>
                <div className="col-sm-7">
                    <Link to="#" onClick={handleItemClicked}>
                        {props.item.name}
                    </Link>
                    <br />
                    <FormattedMessage id="collection_with_name" values={{ n: props.item.collection.name }} />
                    </div>
                <div className="col-sm-3">
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
    )
}
