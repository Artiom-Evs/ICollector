import { useEffect, useState } from "react";
import { useCollectionsApi } from "../../hooks/useCollectionsApi";
import { UserCollectionType } from "../../services/CollectionsApiService";
import { HomeUserCollectionView } from "../shared/HomeUserCollectionView";
import { FormattedMessage } from "react-intl";

function renderCollectionsList(collections: UserCollectionType[]) {
    if (collections.length === 0)
        return <p><em><FormattedMessage id="no_collections" />"</em></p>;

    return (<div>
        {collections.map((c) => <HomeUserCollectionView key={c.id} item={c} />)}
    </div>)
}

export function CollectionsPage() {
    const collectionsApi = useCollectionsApi();
    const [collections, setCollections] = useState<UserCollectionType[]>();

    useEffect(() => {
        collectionsApi.getAll("", "created", true)
            .then(response => response.data)
            .then(data => setCollections(data))
            .catch(error => console.error(error));
    }, [collectionsApi]);

    if (collections === undefined)
        return <p><em><FormattedMessage id="loading" /></em></p>;

    const collectionsList = renderCollectionsList(collections);

    return (<div>
        <h1>
            <FormattedMessage id="collections" />
        </h1>

        {collectionsList}
    </div>);
}