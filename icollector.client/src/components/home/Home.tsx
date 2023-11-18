import { FunctionComponent, useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { UserCollectionType } from "../../services/CollectionsApiService";
import { useCollectionsApi } from "../../hooks/useCollectionsApi";
import { HomeUserCollectionView } from "./HomeUserCollectionView";
import { useItemsApi } from "../../hooks/useItemsApi";
import { CollectionItemType } from "../../services/ItemsDataService";
import { HomeCollectionItemView } from "./HomeCollectionItemView";

const Home: FunctionComponent = () => {
    const collectionsApi = useCollectionsApi();
    const itemsApi = useItemsApi();
    const [collections, setCollections] = useState<UserCollectionType[]>();
    const [items, setItems] = useState<CollectionItemType[]>();
    
    useEffect(() => {
        collectionsApi.getAll("", "itemscount", true, 1, 5)
            .then((response) => response.data)
            .then((data: UserCollectionType[]) => {
                setCollections(data);
            });
        itemsApi.getAll("created", true, 1, 5)
            .then((response) => response.data)
            .then((data: CollectionItemType[]) => {
                setItems(data);
            });
    }, [collectionsApi, itemsApi]);

    const largestCollections = collections === undefined
        ? <p><em>Loading...</em></p>
        : <div>
            {collections.map(item =>
                <HomeUserCollectionView key={item.id} item={item} />
            )}
        </div>;

    const lastAddedItems = items === undefined
        ? <p><em>Loading...</em></p>
        : <div>
            {items.map(item =>
                <HomeCollectionItemView key={item.id} item={item} />
            )}
        </div>;


    return (
        <div>
            <h2>
                <FormattedMessage id="largest_collections" />
            </h2>
            {largestCollections}

            <h2>
                <FormattedMessage id="lastAddedItems" />
            </h2>
            {lastAddedItems}
        </div>
    );
}

export default Home;
