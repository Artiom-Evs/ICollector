import { useLocation } from "react-router-dom";
import { UserCollectionType } from "../../services/CollectionsApiService";
import { useEffect, useState } from "react";
import { useCollectionsApi } from "../../hooks/useCollectionsApi";
import { FormattedMessage } from "react-intl";
import { useUsersApi } from "../../hooks/useUsersApi";
import { UserResponseType } from "../../services/UsersApiService";

function isUserBlocked(user: UserResponseType): boolean {
    return !!user.blockedUntil && new Date(user.blockedUntil).getTime() > Date.now();
}

function getTotalItems(collections: UserCollectionType[]) {
    if (collections.length === 0) return 0;
    return collections.map(c => c.items.length).reduce((prev, curr) => prev + curr)
}

function renderUser(user: UserResponseType, collections: UserCollectionType[]) {
    return (
        <div>
            <h1>{user.email}</h1>
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

            <h2>
                <FormattedMessage id="collections" />
            </h2>

            <table className="table">
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
                        <td>{c.name}</td>
                        <td>{c.items.length}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    );
}

export function UserPage() {
    const { state } = useLocation();
    const [user, setUser] = useState<UserResponseType>();
    const [userCollections, setUserCollections] = useState<UserCollectionType[]>();
    const collectionsApi = useCollectionsApi();
    const usersApi = useUsersApi();

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
    }, [collectionsApi, usersApi, state]);

    const content = !!user && !!userCollections
        ? renderUser(user, userCollections)
        : <p><em><FormattedMessage id="loading" /></em></p>

    return content;
}
