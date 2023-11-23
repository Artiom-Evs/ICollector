import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserCollectionType } from "../../services/CollectionsApiService";
import { MouseEvent, useEffect, useState } from "react";
import { useCollectionsApi } from "../../hooks/useCollectionsApi";
import { FormattedMessage } from "react-intl";
import { useUsersApi } from "../../hooks/useUsersApi";
import { UserResponseType } from "../../services/UsersApiService";
import { Button, ButtonGroup, Table } from "reactstrap";
import useAuth from "../../hooks/useAuth";

function isUserBlocked(user: UserResponseType): boolean {
    return !!user.blockedUntil && new Date(user.blockedUntil).getTime() > Date.now();
}

function getTotalItems(collections: UserCollectionType[]) {
    if (collections.length === 0) return 0;
    return collections.map(c => c.items.length).reduce((prev, curr) => prev + curr)
}

function renderAdminToolbar(user: UserResponseType, onGiveRigthsClick: () => void, onRemoveRigthsClick: () => void, onBlockClick: () => void, onUnblockClick: () => void) {
    return (
        <div className="d-flex justify-content-end">
            <ButtonGroup>
                {user.roles.includes("admin")
                ? <Button onClick={onRemoveRigthsClick}>
                        <FormattedMessage id="remove_admin_rigths" />
                </Button>
                : <Button onClick={onGiveRigthsClick}>
                    <FormattedMessage id="give_admin_rigths" />
                </Button>
                    }
                {isUserBlocked(user)
                    ? <Button onClick={onUnblockClick}>
                        <FormattedMessage id="unblock" />
                    </Button>
                    : <Button onClick={onBlockClick}>
                        <FormattedMessage id="block" />
                    </Button>}
            </ButtonGroup>
        </div>
    );
}

function renderUserDetails(user: UserResponseType, collections: UserCollectionType[]) {
    return (
            <dl>
                <dt>
                    <FormattedMessage id="identifier" />
                </dt>
                <dd>{user.id}</dd>
                <dt>
                    <FormattedMessage id="email" />
                </dt>
                <dd>{user.email}</dd>
                <dt>
                    <FormattedMessage id="status" />
                </dt>
                <dd>
                    {user.roles.includes("admin")
                        ? <FormattedMessage id="admin" />
                        : <FormattedMessage id="user" />}
                </dd>
                <dt>
                    <FormattedMessage id="state" />
                </dt>
                <dd>
                    {isUserBlocked(user)
                        ? <FormattedMessage id="blocked_untill_with_date" values={{ d: new Date(user.blockedUntil ?? "") }} />
                        : <FormattedMessage id="active" />}
                </dd>
                <dt>
                    <FormattedMessage id="collections_count" />
                </dt>
                <dd>{collections.length}</dd>
                <dt>
                    <FormattedMessage id="total_items_count" />
                </dt>
                <dd>
                    {getTotalItems(collections)}
                </dd>
            </dl>
    );
}

function renderUsersList(collections: UserCollectionType[], onCollectionClick: (e: MouseEvent) => void) {
    if (collections.length === 0)
        return <p><em><FormattedMessage id="no_collections" /></em></p>;

    return (
        <Table responsive className="table">
            <thead>
                <tr>
                    <th>
                        <FormattedMessage id="identifier" />
                    </th>
                    <th>
                        <FormattedMessage id="name" />
                    </th>
                    <th>
                        <FormattedMessage id="items_count" />
                    </th>
                </tr>
            </thead>
            <tbody>
                {collections.map(c => <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>
                        <Link to="#" id={c.id.toString()} onClick={onCollectionClick}>
                            {c.name}
                        </Link>
                    </td>
                    <td>{c.items.length}</td>
                </tr>)}
            </tbody>
        </Table>);
}

export function UserPage() {
    const { state } = useLocation();
    const [user, setUser] = useState<UserResponseType>();
    const [userCollections, setUserCollections] = useState<UserCollectionType[]>();
    const [rerender, setRerender] = useState<boolean>(false);
    const { userInfo } = useAuth();
    const collectionsApi = useCollectionsApi();
    const usersApi = useUsersApi();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!state)
            return;

        usersApi.get(state.id ?? "")
            .then(response => response.data)
            .then(data => setUser(data))
            .catch(error => console.error(error));

        collectionsApi.getAll(state.id ?? "")
            .then(response => response.data)
            .then(data => setUserCollections(data))
            .catch(error => console.error(error));
    }, [collectionsApi, usersApi, state, rerender]);

    function handleCollectionClicked(e: MouseEvent) {
        e.preventDefault();
        navigate("/collection", { state: {
            id: e.currentTarget.id
        }});
    }

    function handleGiveRigthsClick() {
        usersApi.addUserToRole({ userId: user?.id ?? "", roleName: "admin" })
            .then(() => setRerender(prev => !prev))
            .catch(error => console.error(error));
    }

    function handleRemoveRigthsClick() {
        usersApi.removeUserFromRole({ userId: user?.id ?? "", roleName: "admin" })
            .then(() => setRerender(prev => !prev))
            .catch(error => console.error(error));
    }

    function handleBlockClick() {
        usersApi.blockUser({ userId: user?.id ?? "" })
            .then(() => setRerender(prev => !prev))
            .catch(error => console.error(error));
    }

    function handleUnblockClick() {
        usersApi.unblockUser({ userId: user?.id ?? "" })
            .then(() => setRerender(prev => !prev))
            .catch(error => console.error(error));
    }

    if (user === undefined || userCollections === undefined) {
        return <p><em><FormattedMessage id="loading" /></em></p>;
    }
    
    const adminToolbar = userInfo?.roles.includes("admin")
        ? renderAdminToolbar(user, handleGiveRigthsClick, handleRemoveRigthsClick, handleBlockClick, handleUnblockClick )
        : <span />;

    return (
        <div>
            {adminToolbar}

            <h1>{user.email}</h1>

            {renderUserDetails(user, userCollections)}
            <br />

            <h2>
                <FormattedMessage id="collections" />
            </h2>

            {renderUsersList(userCollections, handleCollectionClicked)}
        </div>
    )
}
