import { Link, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { MouseEvent } from "react";
import { UserCollectionType } from "../../services/CollectionsApiService";

interface CollectionSearchResultProps {
    collection: UserCollectionType
}

export function CollectionSearchResult(props: CollectionSearchResultProps) {
    const navigate = useNavigate();

    function handleCollectionClicked(e: MouseEvent) {
        e.preventDefault();
        navigate("/collection", { state: { id: props.collection.id } });
    }

    function handleUserClicked(e: MouseEvent) {
        e.preventDefault();
        navigate("/user", { state: { id: props.collection.authorId } });
    }

    return (
        <div className="card mb-2">
            <div className="card-body row">
                <div className="col-sm-8">
                    <Link to="#" onClick={handleCollectionClicked}>
                        {props.collection.name}
                    </Link>
                    <br />
                    {props.collection.description}
                </div>
                <div className="col-sm-4">
                    <FormattedMessage id="author_with_name" values={{ n: "" }} />
                    <Link to="#" onClick={handleUserClicked}>
                        {props.collection.authorName}
                    </Link>
                    <br />
                    <FormattedMessage id="created_with_date" values={{ d: new Date(props.collection.created) }} />
                    <br />
                    <FormattedMessage id="edited_with_date" values={{ d: new Date(props.collection.edited) }} />
                </div>
            </div>
        </div>
    );
}