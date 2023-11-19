import { AxiosInstance, AxiosResponse } from "axios";

const ApiPrefix = "api/Admin/Users";
const ApiPaths = {
    Users: `${ApiPrefix}`,
    BlockUser: `${ApiPrefix}/BlockUser`,
    UnblockUser: `${ApiPrefix}/UnblockUser`,
    AddUserToRole: `${ApiPrefix}/AddUserToRole`,
    RemoveUserFromRole: `${ApiPrefix}/RemoveUserFromRole`,
}

interface PaginationProps {
    page: number,
    pageSize: number
}

export interface UserResponseType {
    id: string,
    email: string,
    roles: string[]
    blockedUntil: string | null,
}

export class UsersApiService {
    instance: AxiosInstance;

    constructor(instance: AxiosInstance) {
        this.instance = instance;
    }

    getAll(props?: PaginationProps): Promise<AxiosResponse<UserResponseType[]>> {
        return this.instance.get(ApiPaths.Users, { params: {
            page: props?.page,
            pageSize: props?.pageSize
        }});
    }

    get(id: string): Promise<AxiosResponse<UserResponseType>> {
        return this.instance.get(`${ApiPaths.Users}/${id}`);
    }

    blockUser(props: { userId: string, blockUntill?: Date | null }) {
        return this.instance.get(ApiPaths.BlockUser, {
            params: {
                userId: props.userId,
                blockUntill: props.blockUntill
            }
        });
    }

    unblockUser(props: { userId: string }) {
        return this.instance.get(ApiPaths.UnblockUser, {
            params: {
                userId: props.userId
            }
        });
    }

    addUserToRole(props: { userId: string, roleName: string }) {
        return this.instance.get(ApiPaths.AddUserToRole, {
            params: {
                userId: props.userId,
                roleName: props.roleName
            }
        });
    }

    removeUserFromRole(props: { userId: string, roleName: string }) {
        return this.instance.get(ApiPaths.RemoveUserFromRole, {
            params: {
                userId: props.userId,
                roleName: props.roleName
            }
        });
    }
}
