import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserCollectionType } from "../../services/CollectionsApiService";
import { MouseEvent, useEffect, useState } from "react";
import { useCollectionsApi } from "../../hooks/useCollectionsApi";
import { FormattedMessage } from "react-intl";
import { Button, ButtonGroup } from "reactstrap";
import useAuth from "../../hooks/useAuth";

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

export function CollectionPage() {
    const { state } = useLocation();
    const { userInfo } = useAuth();
    const [collection, setCollection] = useState<UserCollectionType>();
    const collectionsApi = useCollectionsApi();
    const navigate = useNavigate();

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

    useEffect(() => {
        collectionsApi.get(parseInt(state.id ?? "0"))
            .then(response => response.data)
            .then((data: UserCollectionType) => setCollection(data))
            .catch(error => console.error(error));
    }, [collectionsApi, state]);

    if (collection === undefined) {
        return <p><em><FormattedMessage id="loading" /></em></p>;
    }
    
    return (
        <div>
            {userInfo?.id === collection.authorId && renderToolbar(handleEditClicked, handleDeleteClicked)}
            {renderCollection(collection, handleItemClicked)}
        </div>
    )
}