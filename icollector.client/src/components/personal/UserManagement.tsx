import { useEffect, useState } from "react";
import { useUsersApi } from "../../hooks/useUsersApi";
import { UserResponseType } from "../../services/UsersApiService";
import { FormattedMessage } from "react-intl";
import { Button, Table } from "reactstrap";

function isUserBlocked(user: UserResponseType): boolean {
    return !!user.blockedUntil && new Date(user.blockedUntil).getTime() > Date.now();
}

function renderUsersList(users: UserResponseType[], onBlockClick: (userId: string) => void, onUnblockClick: (userId: string) => void) {
    return (<div>
        <Table responsive className="table">
            <thead>
                <tr>
                    <th>
                        <FormattedMessage id="identifier" />
                    </th>
                    <th>
                        <FormattedMessage id="email" />
                    </th>
                    <th>
                        <FormattedMessage id="status" />
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users.map(u => <tr key={u.id}>
                    <td>
                        <span style={{ whiteSpace: "nowrap" }}>{u.id}</span>
                    </td>
                    <td>{u.email}</td>
                    <td>
                        {isUserBlocked(u) 
                            ? <FormattedMessage id="blocked_untill_with_date" values={{ d: new Date(u.blockedUntil ?? "") }} />
                            : <FormattedMessage id="active" />}
                    </td>
                    <td>
                        {isUserBlocked(u) 
                            ? <Button onClick={() => onUnblockClick(u.id)}>
                                <FormattedMessage id="unblock" />
                            </Button>
                            : <Button onClick={() => onBlockClick(u.id)}>
                                <FormattedMessage id="block" />
                            </Button>}
                    </td>
                </tr>)}
            </tbody>
        </Table>
    </div>)
}

export function UserManagement() {
    const [users, setUsers] = useState<UserResponseType[]>([]);
    const [state, setState] = useState<boolean>(false);
    const usersApi = useUsersApi();

    useEffect(() => {
        usersApi.getUsers()
            .then(response => response.data)
            .then(data => setUsers(data))
            .catch(error => console.error(error));
    }, [usersApi, state]);

    function handleBlockClick(userId: string) {
        usersApi.blockUser({ userId })
            .then(() => setState(prev => !prev))
            .catch(error => console.error(error));
    }

    function handleUnblockClick(userId: string) {
        usersApi.unblockUser({ userId })
            .then(() => setState(prev => !prev))
            .catch(error => console.error(error));
    }

    const content = users.length === 0
        ? <p><em><FormattedMessage id="loading" /></em></p>
        : renderUsersList(users, handleBlockClick, handleUnblockClick);

    return (
        <div>
            <h1>
                <FormattedMessage id="user_management" />
            </h1>
            {content}
        </div>
    )
}
