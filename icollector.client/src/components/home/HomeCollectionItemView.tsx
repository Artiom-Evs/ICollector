import { FormattedMessage } from "react-intl";
import { CollectionItemType } from "../../services/ItemsDataService";

interface HomeCollectionItemViewProps {
    item: CollectionItemType
}

export function HomeCollectionItemView(props: HomeCollectionItemViewProps) {
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
                    {props.item.name}
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
