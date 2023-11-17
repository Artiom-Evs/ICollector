import { useLocation } from "react-router-dom";
import { UserCollectionType } from "../../services/CollectionsDataService";
import { useEffect, useState } from "react";
import { useCollectionsApi } from "../../hooks/useCollectionsApi";

function renderCollection(collection: UserCollectionType) {
    return (
        <div>
            <dl>
                <dt>ID</dt>
                <dd>{collection.id}</dd>
                <dt>Name</dt>
                <dd>{collection.name}</dd>
                <dt>Description</dt>
                <dd>{collection.description}</dd>
                <dt>Author</dt>
                <dd>{collection.authorName}</dd>
            </dl>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {collection.items.map(item => <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
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

    useEffect(() => {
        collectionsApi.get(parseInt(state.id ?? "0"))
            .then(response => response.data)
            .then((data: UserCollectionType) => setCollection(data))
            .catch(error => console.error(error));
    }, [collectionsApi, state]);

    const content = collection === undefined
        ? <p><em>Loading...</em></p>
        : renderCollection(collection);

    return content;
}