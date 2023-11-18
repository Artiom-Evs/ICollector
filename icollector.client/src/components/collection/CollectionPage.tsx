import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserCollectionType } from "../../services/CollectionsApiService";
import { MouseEvent, useEffect, useState } from "react";
import { useCollectionsApi } from "../../hooks/useCollectionsApi";
import { FormattedMessage } from "react-intl";

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
    const [collection, setCollection] = useState<UserCollectionType>();
    const collectionsApi = useCollectionsApi();
    const navigate = useNavigate();

    function handleItemClicked(e: MouseEvent) {
        e.preventDefault();
        navigate("/item", { state: { id: e.currentTarget.id } });
    }

    useEffect(() => {
        collectionsApi.get(parseInt(state.id ?? "0"))
            .then(response => response.data)
            .then((data: UserCollectionType) => setCollection(data))
            .catch(error => console.error(error));
    }, [collectionsApi, state]);

    const content = collection === undefined
        ? <p><em><FormattedMessage id="loading" /></em></p>
        : renderCollection(collection, handleItemClicked);

    return content;
}