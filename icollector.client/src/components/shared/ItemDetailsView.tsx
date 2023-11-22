import { UserCollectionType } from "../../services/CollectionsApiService";
import { CollectionItemType } from "../../services/ItemsApiService";
import { Link, useNavigate } from "react-router-dom";
import { Fragment, MouseEvent } from "react";
import { FormattedMessage } from "react-intl";

interface ItemDetailsViewProps {
    item: CollectionItemType,
    collection: UserCollectionType
}

function renderNumericDetails(item: CollectionItemType, collection: UserCollectionType) {
    return (<Fragment>
        {collection.number1Name && <Fragment>
            <dt>{collection.number1Name}</dt>
            <dd>{item.number1}</dd>
        </Fragment>}

        {collection.number2Name && <Fragment>
            <dt>{collection.number2Name}</dt>
            <dd>{item.number2}</dd>
        </Fragment>}

        {collection.number3Name && <Fragment>
            <dt>{collection.number3Name}</dt>
            <dd>{item.number3}</dd>
        </Fragment>}
    </Fragment>);
}

function renderTextDetails(item: CollectionItemType, collection: UserCollectionType) {
    return (<Fragment>
        {collection.text1Name && <Fragment>
            <dt>{collection.text1Name}</dt>
            <dd>{item.text1}</dd>
        </Fragment>}

        {collection.text2Name && <Fragment>
            <dt>{collection.text2Name}</dt>
            <dd>{item.text2}</dd>
        </Fragment>}

        {collection.text3Name && <Fragment>
            <dt>{collection.text3Name}</dt>
            <dd>{item.text3}</dd>
        </Fragment>}
    </Fragment>);
}

function renderMultilineDetails(item: CollectionItemType, collection: UserCollectionType) {
    return (<Fragment>
        {collection.multiline1Name && <Fragment>
            <dt>{collection.multiline1Name}</dt>
            <dd>{item.multiline1}</dd>
        </Fragment>}

        {collection.multiline2Name && <Fragment>
            <dt>{collection.multiline2Name}</dt>
            <dd>{item.multiline2}</dd>
        </Fragment>}

        {collection.multiline3Name && <Fragment>
            <dt>{collection.multiline3Name}</dt>
            <dd>{item.multiline3}</dd>
        </Fragment>}
    </Fragment>);
}

export function ItemDetailsView({ item, collection }: ItemDetailsViewProps) {
    const navigate = useNavigate();

    function handleUserClicked(e: MouseEvent) {
        e.preventDefault();
        navigate("/user", {
            state: { id: item?.collection.authorId }
        });
    }

    function handleCollectionClicked(e: MouseEvent) {
        e.preventDefault();
        navigate("/collection", {
            state: { id: item?.collection.id }
        });
    }

    const numericDetails = renderNumericDetails(item, collection);
    const textDetails = renderTextDetails(item, collection);
    const multilineDetails = renderMultilineDetails(item, collection);

    return (
        <div>
            <dl>
                <dt>
                    <FormattedMessage id="identifier" />
                </dt>
                <dd>{item.id}</dd>
                <dt>
                    <FormattedMessage id="name" />
                </dt>
                <dd>{item.name}</dd>
                <dt>
                    <FormattedMessage id="author" />
                </dt>
                <dd>
                    <Link to="#" onClick={handleUserClicked}>
                        {item.collection.authorName}
                    </Link>
                </dd>
                <dt>
                    <FormattedMessage id="collection" />
                </dt>
                <dd>
                    <Link to="#" onClick={handleCollectionClicked}>
                        {item.collection.name}
                    </Link>
                </dd>
                {numericDetails}
                {textDetails}
                {multilineDetails}
            </dl>
        </div>
    );
}
