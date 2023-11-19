import { AxiosInstance, AxiosResponse } from "axios";

const ApiPrefix = "/api/identity";

export const ApiPaths = {
    Register: `${ApiPrefix}/register`,
    Login: `${ApiPrefix}/login`,
    Refresh: `${ApiPrefix}/refresh`,
    Info: `${ApiPrefix}/manage/info`,
    DetailedInfo: `${ApiPrefix}/manage/detailedInfo`
}

export interface RefreshResponseType {
    accessToken: string,
    refreshToken: string,
    expireIn: number
}

export interface LoginResponseType {
    accessToken: string,
    refreshToken: string,
    expireIn: number
}

export interface UserInfoType {
    id: string,
    email: string,
    isEmailConfirmed: boolean,
    roles: string[]
}

class AuthApiService {
    instance: AxiosInstance;

    constructor(instance: AxiosInstance) {
        this.instance = instance;
    }

    register(email: string, password: string): Promise<AxiosResponse> {
        return this.instance.post(ApiPaths.Register, {
            email, password
        });
    }
        
    login(email: string, password: string): Promise<AxiosResponse<LoginResponseType>> {
        return this.instance.post(ApiPaths.Login, {
            email, password
        });
    }

    refresh(refreshToken: string): Promise<AxiosResponse<RefreshResponseType>> {
        return this.instance.post(ApiPaths.Refresh, {
            refreshToken
        });
    }

    getUserInfo(): Promise<AxiosResponse<UserInfoType>> {
        return this.instance.get(ApiPaths.DetailedInfo);
    }
}

export default AuthApiService;
