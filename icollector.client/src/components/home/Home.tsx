import { FunctionComponent, useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { UserCollectionType } from "../../services/CollectionsDataService";
import { useCollectionsApi } from "../../hooks/useCollectionsApi";
import { HomeCollectionItem } from "./HomeCollectionItem";

const Home: FunctionComponent = () => {
    const collectionsApi = useCollectionsApi();
    const [collections, setCollections] = useState<UserCollectionType[]>();
    
    useEffect(() => {
        collectionsApi.getAll("created", true, 1, 5)
            .then((response) => response.data)
            .then((data: UserCollectionType[]) => {
                setCollections(data);
            });
    }, [collectionsApi]);

    const contents = collections === undefined
        ? <p><em>Loading...</em></p>
        : <div>
            {collections.map(item =>
                <HomeCollectionItem key={item.id} item={item} />
            )}
        </div>;
    
    return (
        <div>
            <h1>
                <FormattedMessage id="largest_collections" />
            </h1>
            {contents}
        </div>
    );
}

export default Home;
