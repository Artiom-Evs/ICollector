import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserCollectionType } from "../../services/CollectionsApiService";
import { Fragment, MouseEvent, useEffect, useState } from "react";
import { useCollectionsApi } from "../../hooks/useCollectionsApi";
import { FormattedMessage } from "react-intl";
import { Button, ButtonGroup, Table } from "reactstrap";
import useAuth from "../../hooks/useAuth";
import { CollectionItemType } from "../../services/ItemsApiService";

const TABLE_MULTILINE_TEXT_LENGTH = 30;

enum PageStates {
    Loading,
    NotFound,
    Content
}

function renderToolbar(onAddClicked: (e: MouseEvent) => void, onEditClicked: () => void, onDeleteClicked: () => void) {
    return (
        <div className="d-flex justify-content-end">
            <ButtonGroup>
                <Button onClick={onAddClicked}>
                    <FormattedMessage id="add_new_item" />
                </Button>
                <Button onClick={onEditClicked}>
                    <FormattedMessage id="edit" />
                </Button>
                <Button onClick={onDeleteClicked}>
                    <FormattedMessage id="delete" />
                </Button>
            </ButtonGroup>
        </div>
    )
}

function renderTableAdditionalHeaders(collection: UserCollectionType) {
    return (<Fragment>
        {collection.number1Name && <th>{collection.number1Name}</th>}
        {collection.number2Name && <th>{collection.number2Name}</th>}
        {collection.number3Name && <th>{collection.number3Name}</th>}

        {collection.text1Name && <th>{collection.text1Name}</th>}
        {collection.text2Name && <th>{collection.text2Name}</th>}
        {collection.text3Name && <th>{collection.text3Name}</th>}

        {collection.multiline1Name && <th>{collection.multiline1Name}</th>}
        {collection.multiline2Name && <th>{collection.multiline2Name}</th>}
        {collection.multiline3Name && <th>{collection.multiline3Name}</th>}
    </Fragment>)
}

function renderRowAdditionalColumns(item: CollectionItemType, collection: UserCollectionType) {
    function formatLongText(text: string) {
        if (text.length <= TABLE_MULTILINE_TEXT_LENGTH) return text;
        return text.slice(0, TABLE_MULTILINE_TEXT_LENGTH) + "...";
    }

    return (<Fragment>
        {collection.number1Name && <td>{item.number1}</td>}
        {collection.number2Name && <td>{item.number2}</td>}
        {collection.number3Name && <td>{item.number3}</td>}

        {collection.text1Name && <td>{item.text1}</td>}
        {collection.text2Name && <td>{item.text2}</td>}
        {collection.text3Name && <td>{item.text3}</td>}

        {collection.multiline1Name && <td>{formatLongText(item.multiline1 ?? "")}</td>}
        {collection.multiline2Name && <td>{formatLongText(item.multiline2 ?? "")}</td>}
        {collection.multiline3Name && <td>{formatLongText(item.multiline3 ?? "")}</td>}
    </Fragment>)
}

function renderCollection(collection: UserCollectionType, onItemClick: (e: MouseEvent) => void, onUserClick: (e: MouseEvent) => void) {
    return (
        <div>
            <dl>
                <dt>
                    <FormattedMessage id="identifier" />
                </dt>
                <dd>{collection.id}</dd>
                <dt>
                    <FormattedMessage id="name" />
                </dt>
                <dd>{collection.name}</dd>
                <dt>
                    <FormattedMessage id="description" />
                </dt>
                <dd>{collection.description}</dd>
                <dt>
                    <FormattedMessage id="author" />
                </dt>
                <dd>
                    <Link to="#" id={collection.authorId} onClick={onUserClick}>
                        {collection.authorName}
                    </Link>
                </dd>
            </dl>
            <div>
                <Table className="table" responsive>
                    <thead>
                        <tr>
                            <th>
                                <FormattedMessage id="identifier" />
                            </th>
                            <th>
                                <FormattedMessage id="name" />
                            </th>
                            {renderTableAdditionalHeaders(collection)}
                        </tr>
                    </thead>
                    <tbody>
                        {collection.items.map(item => <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>
                                <Link to="#" id={item.id.toString()} onClick={onItemClick}>
                                    {item.name}
                                </Link>
                            </td>
                            {renderRowAdditionalColumns(item, collection)}
                        </tr>)}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

function renderNotFound(onBackClick: () => void) {
    return (
        <div>
            <p><em><FormattedMessage id="no_collection" /></em></p>
            <Button onClick={onBackClick}>
                <FormattedMessage id="back" />
            </Button>
        </div>
    )
}

export function CollectionPage() {
    const { state } = useLocation();
    const { userInfo } = useAuth();
    const [pageState, setPageState] = useState<PageStates>(PageStates.Loading);
    const [collection, setCollection] = useState<UserCollectionType>();
    const collectionsApi = useCollectionsApi();
    const navigate = useNavigate();

    useEffect(() => {
        collectionsApi.get(state?.id ?? "0")
            .then(response => response.data)
            .then((data: UserCollectionType) => {
                setCollection(data);
                setPageState(PageStates.Content);
            })
            .catch(error => {
                if (error.response.status === 404) setPageState(PageStates.NotFound);
                else console.error(error);
            });
    }, [collectionsApi, state]);

    function handleItemClicked(e: MouseEvent) {
        e.preventDefault();
        navigate("/item", { state: { id: e.currentTarget.id } });
    }


    function handleUserClicked(e: MouseEvent) {
        e.preventDefault();
        navigate("/user", { state: { id: e.currentTarget.id } });
    }

    function handleAddClicked() {
        navigate("/item/create", {
            state: {
                collectionId: collection?.id
            }
        });
    }

    function handleEditClicked() {
        navigate("/collection/edit", {
            state: {
                id: collection?.id
        }});
    }

    function handleDeleteClicked() {
        navigate("/collection/delete", {
            state: {
                id: collection?.id
            }
        });
    }

    function handleBackClicked() {
        navigate(-1);
    }

    if (pageState === PageStates.Loading) {
        return <p><em><FormattedMessage id="loading" /></em></p>;
    }
    else if (pageState === PageStates.NotFound || !collection) {
        return renderNotFound(handleBackClicked);
    }

    const toolbar = userInfo?.id === collection.authorId || userInfo?.roles.includes("admin")
        ? renderToolbar(handleAddClicked, handleEditClicked, handleDeleteClicked)
        : <span />;

    return (
        <div>
            {toolbar}
            {renderCollection(collection, handleItemClicked, handleUserClicked)}
        </div>
    )
}
