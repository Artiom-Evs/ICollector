import { MouseEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TabContent, TabPane } from "reactstrap";
import useAuth from "../../hooks/useAuth";
import { UserCollectionType } from "../../services/CollectionsDataService";
import { useCollectionsApi } from "../../hooks/useCollectionsApi";
import { FormattedMessage } from "react-intl";

export function PersonalPage() {
    const [currentTab, setCurrentTab] = useState<string>("home-tab");
    const { userInfo } = useAuth();
    const [userCollections, setUserCollections] = useState<UserCollectionType[]>([]);
    const collectionsApi = useCollectionsApi();

    useEffect(() => {
        if (userInfo === null)
            return;
        collectionsApi.getAll(userInfo?.id, "id", false, 1, 100)
            .then(response => response.data)
            .then(data => setUserCollections(data));
    }, [collectionsApi, userInfo]);

    const handleTabChanged = (e: MouseEvent) => {
        e.preventDefault();
        e.currentTarget.classList.add("active");
        setCurrentTab(e.currentTarget.id);
    }

    return (
        <div className="row">
            <div className="col-sm-3">
                <div className="list-group" id="list-tab" role="tablist">
                    <Link to="#" className={currentTab === "home-tab" ? "list-group-item active" : "list-group-item"} id="home-tab" role="tab" onClick={handleTabChanged}>Home</Link>
                </div>
            </div>
            <div className="col-sm-9">
                <TabContent activeTab={currentTab}>
                    <TabPane tabId="home-tab">
                        <UserCollectionsList collections={userCollections} />
                    </TabPane>
                </TabContent>
            </div>
        </div>
    )
}

function UserCollectionsList({ collections }: { collections: UserCollectionType[] }) {
    const content = collections === undefined || collections.length === 0
        ? <p><em>No collections.</em></p>
        : <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {collections.map(collection =>
                <UserCollectionListItem key={collection.id} collection={collection} />
            )}
        </div>;
    
    return content;
}

function UserCollectionListItem({ collection }: { collection: UserCollectionType }) {
    return (
        <div className="col">
            <div className="card h-100">
                <div className="card-header">
                    <h5 className="card-title">{ collection.name }</h5>
                </div>
                <div className="card-body">
                    <p className="card-text">{ collection.description }</p>
                    <br />
                    <FormattedMessage id="items" values={{ c: collection.items.length }} />
                </div>
                <div className="card-footer">
                    <FormattedMessage id="likes" values={{ c: 0 }} />
                    <br />
                    <FormattedMessage id="comments" values={{ c: 0 }} />
                </div>
            </div>
        </div>
    );
}