import { FormattedMessage } from "react-intl";
import { UserCollectionType } from "../../services/CollectionsDataService";

interface HomeCollectionItemProps {
    item: UserCollectionType
}

export function HomeUserCollectionView(props: HomeCollectionItemProps) {
    return (
        <div className="card mb-2">
            <div className="card-body row">
                <div className="col-sm-2" style={{ textAlign: "right"}}>
                    <p>
                        <FormattedMessage id="likes" values={{ c: 0 }} />
                        <br />
                        <FormattedMessage id="comments" values={{ c: 0 }} />
                    </p>
                </div>
                <div className="col-sm-8">
                    {props.item.name}
                    <br />
                    <FormattedMessage id="items" values={{ c: props.item.items.length }} />
                </div>
                <div className="col-sm-2">
                    <FormattedMessage id="created"values={{ d: new Date(props.item.created) }} />
                    <br />
                    <FormattedMessage id="edited" values={{ d: new Date(props.item.edited) }} />
                </div>
            </div>
        </div>
    )
}
