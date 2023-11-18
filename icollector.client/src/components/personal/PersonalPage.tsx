import { MouseEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TabContent, TabPane } from "reactstrap";
import useAuth from "../../hooks/useAuth";
import { UserCollectionType } from "../../services/CollectionsApiService";
import { useCollectionsApi } from "../../hooks/useCollectionsApi";
import { FormattedMessage } from "react-intl";
import { UserCollectionsList } from "./UserCollectionsList";

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
