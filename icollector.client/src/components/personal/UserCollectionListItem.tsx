import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { UserCollectionType } from "../../services/CollectionsApiService";
import { MouseEvent } from "react";

interface UserCollectionListItemProps {
    collection: UserCollectionType,
    onCollectionClick: (e: MouseEvent) => void
}

export function UserCollectionListItem(props: UserCollectionListItemProps) {
    return (
        <div className="col">
            <div className="card h-100">
                <div className="card-header">
                    <h5 className="card-title">
                        <Link to="#" id={props.collection.id.toString()} onClick={props.onCollectionClick}>{props.collection.name}</Link>
                    </h5>
                </div>
                <div className="card-body">
                    <p className="card-text">{props.collection.description}</p>
                    <br />
                    <FormattedMessage id="items_with_number" values={{ n: props.collection.items.length }} />
                </div>
                <div className="card-footer">
                    <FormattedMessage id="likes_with_number" values={{ n: 0 }} />
                    <br />
                    <FormattedMessage id="comments_with_number" values={{ n: 0 }} />
                </div>
            </div>
        </div>
    );
}