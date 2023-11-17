import { FormattedMessage } from "react-intl";
import { CollectionItemType } from "../../services/ItemsDataService";
import { Link, useNavigate } from "react-router-dom";
import { MouseEvent } from "react";

interface HomeCollectionItemViewProps {
    item: CollectionItemType
}

export function HomeCollectionItemView(props: HomeCollectionItemViewProps) {
    const navigate = useNavigate();

    const handleItemClicked = (e: MouseEvent) => {
        e.preventDefault();
        navigate("/item", { state: { id: props.item.id } });
    }

    return (
        <div className="card mb-2">
            <div className="card-body row">
                <div className="col-sm-2" style={{ textAlign: "right" }}>
                    <p>
                        <FormattedMessage id="likes" values={{ c: 0 }} />
                        <br />
                        <FormattedMessage id="comments" values={{ c: 0 }} />
                    </p>
                </div>
                <div className="col-sm-7">
                    <Link to="#" onClick={handleItemClicked}>
                        {props.item.name}
                    </Link>
                </div>
                <div className="col-sm-3">
                    <FormattedMessage id="author" values={{ a: props.item.collection.authorName }} />
                    <br />
                    <FormattedMessage id="created" values={{ d: new Date(props.item.created) }} />
                    <br />
                    <FormattedMessage id="edited" values={{ d: new Date(props.item.edited) }} />
                </div>
            </div>
        </div>
    )
}
