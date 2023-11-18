import { MouseEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TabContent, TabPane } from "reactstrap";
import useAuth from "../../hooks/useAuth";
import { UserCollectionType } from "../../services/CollectionsApiService";
import { useCollectionsApi } from "../../hooks/useCollectionsApi";
import { FormattedMessage } from "react-intl";

export function PersonalPage() {
    const [currentTab, setCurrentTab] = useState<string>("home-tab");
    const { userInfo } = useAuth();
    const [userCollections, setUserCollections] = useState<UserCollectionType[]>([]);
    const collectionsApi = useCollectionsApi();
    const navigate = useNavigate();

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

    const handleCollectionClicked = (e: MouseEvent) => {
        e.preventDefault();
        navigate("/collection", { state: { id: e.currentTarget.id } });
    }

    const handleCreateCollectionClicked = () => {
        navigate("/collection/create");
    }

    return (
        <div className="row">
            <div className="col-sm-3">
                <div className="list-group" id="list-tab" role="tablist">
                    <Link to="#" className={currentTab === "home-tab" ? "list-group-item active" : "list-group-item"} id="home-tab" role="tab" onClick={handleTabChanged}>
                        <FormattedMessage id="collections_page" />
                    </Link>
                </div>
            </div>
            <div className="col-sm-9">
                <TabContent activeTab={currentTab}>
                    <TabPane tabId="home-tab">
                        <div className="d-flex justify-content-end mb-3">
                            <Button onClick={handleCreateCollectionClicked}>
                                <FormattedMessage id="create_new_collection" />
                            </Button>
                        </div>
                        <UserCollectionsList collections={userCollections} onCollectionClick={handleCollectionClicked} />
                    </TabPane>
                </TabContent>
            </div>
        </div>
    )
}

interface UserCollectionsListProps {
    collections: UserCollectionType[],
    onCollectionClick: (e: MouseEvent) => void
}

function UserCollectionsList(props: UserCollectionsListProps) {
    const content = props.collections === undefined || props.collections.length === 0
        ? <p><em> No props.collections.</em></p>
        : <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {props.collections.map(collection =>
                <UserCollectionListItem key={collection.id} collection={collection} onCollectionClick={props.onCollectionClick} />
            )}
        </div>;
    
    return content;
}

interface UserCollectionsListItemProps {
    collection: UserCollectionType,
    onCollectionClick: (e: MouseEvent) => void
}

function UserCollectionListItem(props: UserCollectionsListItemProps) {
    return (
        <div className="col">
            <div className="card h-100">
                <div className="card-header">
                    <h5 className="card-title">
                        <Link to="#" id={props.collection.id.toString()} onClick={props.onCollectionClick}>{props.collection.name}</Link>
                    </h5>
                </div>
                <div className="card-body">
                    <p className="card-text">{props.collection.description }</p>
                    <br />
                    <FormattedMessage id="items" values={{ c: props.collection.items.length }} />
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