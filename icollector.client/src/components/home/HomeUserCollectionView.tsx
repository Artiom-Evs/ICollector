import { FormattedMessage } from "react-intl";
import { UserCollectionType } from "../../services/CollectionsApiService";
import { Link, useNavigate } from "react-router-dom";
import { MouseEvent } from "react";

interface HomeUserCollectionProps {
    item: UserCollectionType
}

export function HomeUserCollectionView(props: HomeUserCollectionProps) {
    const navigate = useNavigate();

    const handleCollectionClicked = (e: MouseEvent) => {
        e.preventDefault();
        navigate("/collection", { state: { id: props.item.id } });
    }

    return (
        <div className="card mb-2">
            <div className="card-body row">
                <div className="col-sm-2" style={{ textAlign: "right"}}>
                    <FormattedMessage id="items_with_number" values={{ n: props.item.items.length }} />
                    <br />
                    <FormattedMessage id="likes_with_number" values={{ n: 0 }} />
                    <br />
                    <FormattedMessage id="comments_with_number" values={{ n: 0 }} />
                </div>
                <div className="col-sm-7">
                    <Link to="#" onClick={handleCollectionClicked}>
                        {props.item.name}
                    </Link>
                    <br />
                    {props.item.description}
                </div>
                <div className="col-sm-3">
                    <FormattedMessage id="author_with_name" values={{ n: props.item.authorName }} />
                    <br />
                    <FormattedMessage id="created_with_date"values={{ d: new Date(props.item.created) }} />
                    <br />
                    <FormattedMessage id="edited_with_date" values={{ d: new Date(props.item.edited) }} />
                </div>
            </div>
        </div>
    )
}
