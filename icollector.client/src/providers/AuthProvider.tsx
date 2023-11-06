import { createContext, FunctionComponent, PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react";
import axios, { AxiosInstance } from "axios";

const ApiPrefix = "/api/identity";

export const ApiPaths = {
    Register: `${ApiPrefix}/register`,
    Login: `${ApiPrefix}/login`,
    Refresh: `${ApiPrefix}/refresh`,
    Info: `${ApiPrefix}/manage/info`
}

interface ApiErrorResult {
    status: number,
    title: string,
    detail: string,
    errors: Record<string, string[]>
}

interface AuthResult {
    status: number,
    data: ApiErrorResult | null
}

export interface UserInfoType {
    id: string,
    name: string,
    email: string
}

export interface AuthContextType {
    register: (email: string, password: string) => Promise<AuthResult>,
    login: (email: string, password: string) => Promise<AuthResult>,
    refresh: () => Promise<AuthResult>,
    logout: () => void,
    updateUserInfo: () => Promise<AuthResult>,
    userInfo: UserInfoType | null,
    isAuthorized: boolean,
    authAxios: AxiosInstance
}

function getStoredAccessToken(): string | null {
    return localStorage.getItem("access-token");
}

function setStoredAccessToken(token: string | null): void {
    token
        ? localStorage.setItem("access-token", token)
        : localStorage.removeItem("access-token");
}

function getStoredRefreshToken(): string | null {
    return localStorage.getItem("refresh-token");
}

function setStoredRefreshToken(token: string | null): void {
    token
        ? localStorage.setItem("refresh-token", token)
        : localStorage.removeItem("refresh-token");
}

function getStoredexpiration(): number | null {
    return parseInt(localStorage.getItem("access-token-expiration") ?? "") ?? null;
}

function setStoredExpiration(expiration: number | null): void {
    expiration
        ? localStorage.setItem("access-token-expiration", expiration.toString())
        : localStorage.removeItem("access-token-expiration");
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const [isAuthorized, setAuthorized] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
    
    const instance = useMemo(() => {
        const instance = axios.create();
        instance.interceptors.request.use(async (request) => {
            const expiration = getStoredexpiration();
            if (expiration && expiration < Date.now()) {
                await refresh(getStoredRefreshToken() ?? "");
            }

            const token = getStoredAccessToken();
            if (token) {
                request.headers.Authorization = `Bearer ${token}`;
            }
            return request;
        });
        return instance;
    }, []);

    const register = (email: string, password: string): Promise<AuthResult> => {
        return axios.post(ApiPaths.Register, {
            email, password
        })
            .then(() => {
                return { status: 200 } as AuthResult;
            })
            .catch(error => {
                console.log(`>> Register error: ${error}.`);
                return { status: error.response?.status ?? 200, data: error.response?.data } as AuthResult;
            });
    }

    const login = (email: string, password: string): Promise<AuthResult> => {
        return axios.post(ApiPaths.Login, {
            email, password
        })
            .then(response => response.data)
            .then(({ accessToken, refreshToken, expireIn }) => {
                setStoredRefreshToken(refreshToken);
                setStoredAccessToken(accessToken);
                setStoredExpiration(Date.now() + expireIn * 1000);
                setAuthorized(true);
                return { status: 200 } as AuthResult;
            })
            .catch(error => {
                console.log(`>> login error: ${error}.`);
                return { status: error.response?.status ?? 200, data: error.response?.data } as AuthResult;
            });
    }

    const refresh = (refreshToken: string): Promise<AuthResult> => {
        return axios.post(ApiPaths.Refresh, {
            refreshToken
        })
            .then(response => response.data)
            .then(({ accessToken, refreshToken, expireIn }) => {
                setStoredRefreshToken(refreshToken);
                setStoredAccessToken(accessToken);
                setStoredExpiration(Date.now() + expireIn * 1000);
                setAuthorized(true);
                return { status: 200 } as AuthResult;
            })
            .catch(error => {
                console.log(`>> Refresh error: ${error}.`);
                return { status: error.response?.status ?? 200, data: error.response?.data } as AuthResult;
            });
    }

    const logout = () => {
        setStoredRefreshToken(null);
        setStoredAccessToken(null);
        setStoredExpiration(null);
        setAuthorized(false);
    }

    const updateUserInfo = useCallback((): Promise<AuthResult> => {
        return instance.get(ApiPaths.Info)
            .then(response => response.data)
            .then(({ email, claims }) => {
                setUserInfo({
                    id: claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
                    name: claims["https://localhost:7000/swagger/index.html#:~:text=http%3A//schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
                    email
                } as UserInfoType);
                return { status: 200 } as AuthResult;
            })
            .catch(error => {
                console.log(`>> Refresh error: ${error}.`);
                return { status: error.response?.status ?? 200, data: error.response?.data } as AuthResult;
            });
    }, [instance]);

    useEffect(() => {
        const token = getStoredRefreshToken();
        refresh(token ?? "");
        updateUserInfo();
    }, [updateUserInfo]);
    
    const contextValue = useMemo(() => ({
        register,
        login,
        refresh,
        logout,
        updateUserInfo,
        userInfo,
        isAuthorized,
        authAxios: instance
    } as AuthContextType), [
        updateUserInfo,
        userInfo,
        isAuthorized,
        instance
    ]);
    
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
