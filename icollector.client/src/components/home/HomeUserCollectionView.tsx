import { FormattedMessage } from "react-intl";
import { UserCollectionType } from "../../services/CollectionsDataService";
import { Link, useNavigate } from "react-router-dom";
import { MouseEvent } from "react";

interface HomeCollectionItemProps {
    item: UserCollectionType
}

export function HomeUserCollectionView(props: HomeCollectionItemProps) {
    const navigate = useNavigate();

    const handleCollectionClicked = (e: MouseEvent) => {
        e.preventDefault();
        navigate("/collection", { state: { id: props.item.id } });
    }

    return (
        <div className="card mb-2">
            <div className="card-body row">
                <div className="col-sm-2" style={{ textAlign: "right"}}>
                    <FormattedMessage id="items" values={{ c: props.item.items.length }} />
                    <br />
                    <FormattedMessage id="likes" values={{ c: 0 }} />
                    <br />
                    <FormattedMessage id="comments" values={{ c: 0 }} />
                </div>
                <div className="col-sm-7">
                    <Link to="#" onClick={handleCollectionClicked}>
                        {props.item.name}
                    </Link>
                    <br />
                    {props.item.description}
                </div>
                <div className="col-sm-3">
                    <FormattedMessage id="author" values={{ a: props.item.authorName }} />
                    <br />
                    <FormattedMessage id="created"values={{ d: new Date(props.item.created) }} />
                    <br />
                    <FormattedMessage id="edited" values={{ d: new Date(props.item.edited) }} />
                </div>
            </div>
        </div>
    )
}
