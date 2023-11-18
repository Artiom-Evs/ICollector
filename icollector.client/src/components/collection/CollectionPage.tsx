import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserCollectionType } from "../../services/CollectionsApiService";
import { MouseEvent, useEffect, useState } from "react";
import { useCollectionsApi } from "../../hooks/useCollectionsApi";
import { FormattedMessage } from "react-intl";
import { Button, ButtonGroup } from "reactstrap";
import useAuth from "../../hooks/useAuth";

enum PageStates {
    Loading,
    NotFound,
    Content
}

function renderToolbar(onEditClicked: (e: MouseEvent) => void, onDeleteClicked: (e: MouseEvent) => void) {
    return (
        <div className="d-flex justify-content-end">
            <ButtonGroup>
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

function renderCollection(collection: UserCollectionType, onItemClick: (e: MouseEvent) => void) {
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
                <dd>{collection.authorName}</dd>
            </dl>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                <FormattedMessage id="identifier" />
                            </th>
                            <th>
                                <FormattedMessage id="name" />
                            </th>
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
                        </tr>)}
                    </tbody>
                </table>
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
                if (error.response.status === 404) {
                    setPageState(PageStates.NotFound);
                }
                else {
                    console.error(error)
                }
            });
    }, [collectionsApi, state]);

    function handleItemClicked(e: MouseEvent) {
        e.preventDefault();
        navigate("/item", { state: { id: e.currentTarget.id } });
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

    return (
        <div>
            {userInfo?.id === collection.authorId && renderToolbar(handleEditClicked, handleDeleteClicked)}
            {renderCollection(collection, handleItemClicked)}
        </div>
    )
}