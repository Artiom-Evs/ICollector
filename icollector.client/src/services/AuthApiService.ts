import { AxiosInstance, AxiosResponse } from "axios";

const ApiPrefix = "/api/identity";

export const ApiPaths = {
    Register: `${ApiPrefix}/register`,
    Login: `${ApiPrefix}/login`,
    Refresh: `${ApiPrefix}/refresh`,
    Info: `${ApiPrefix}/manage/info`
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
    email: string,
    isEmailConfirmed: boolean
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
        return this.instance.get(ApiPaths.Info);
    }
}

export default AuthApiService;
