import { createContext, FunctionComponent, PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react";
import axios, { AxiosInstance } from "axios";
import AuthApiService, { UserInfoType } from "../services/AuthApiService";

export interface AuthErrorResult {
    status: number,
    title: string,
    detail: string,
    errors: Record<string, string[]>
}

export interface AuthResult {
    status: number,
    data: AuthErrorResult | null
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

function setAuthState(accessToken: string | null, refreshToken: string | null, expireIn: number | null) {
    setStoredRefreshToken(refreshToken);
    setStoredAccessToken(accessToken);
    setStoredExpiration(expireIn !== null ? Date.now() + expireIn * 1000 : null);
}

export interface AuthContextType {
    register: (email: string, password: string) => Promise<AuthResult>,
    login: (email: string, password: string) => Promise<AuthResult>,
    refresh: () => Promise<AuthResult>,
    updateUserInfo: () => Promise<AuthResult>,
    logout: () => void,
    userInfo: UserInfoType | null,
    isAuthorized: boolean,
    authAxios: AxiosInstance
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const [isAuthorized, setAuthorized] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UserInfoType| null>(null);
    
    const [instance, authApi] = useMemo(() => {
        const instance = axios.create();
        const authApi = new AuthApiService(instance);

        instance.interceptors.request.use(async (request) => {
            const expiration = getStoredexpiration();
            if (expiration && expiration < Date.now()) {
                await authApi.refresh(getStoredRefreshToken() ?? "")
                    .then(response => response.data)
                    .then(data => {
                        setAuthState(data.accessToken, data.refreshToken, data.expireIn);
                    });
            }

            const token = getStoredAccessToken();
            if (token) {
                request.headers.Authorization = `Bearer ${token}`;
            }
            return request;
        });
        return [instance, authApi];
    }, []);
    
    const register = useCallback((email: string, password: string): Promise<AuthResult> =>
        authApi.register(email, password)
            .then(() => {
                return { status: 200 } as AuthResult;
            })
            .catch(error => {
                console.log(`>> Register error: ${error}.`);
                return { status: error.response?.status ?? 200, data: error.response?.data } as AuthResult;
            }), [authApi]);

    const login = useCallback((email: string, password: string): Promise<AuthResult> =>
        authApi.login(email, password)
            .then(response => response.data)
            .then(data => {
                setAuthState(data.accessToken, data.refreshToken, data.expireIn);
                setAuthorized(true);
                return { status: 200 } as AuthResult;
            })
            .catch(error => {
                console.log(`>> login error: ${error}.`);
                return { status: error.response?.status ?? 200, data: error.response?.data } as AuthResult;
            }), [authApi]);
    
    const refresh = useCallback((refreshToken: string): Promise<AuthResult> =>
        authApi.refresh(refreshToken)
            .then(response => response.data)
            .then(data => {
                setAuthState(data.accessToken, data.refreshToken, data.expireIn);
                setAuthorized(true);
                return { status: 200 } as AuthResult;
            })
            .catch(error => {
                console.log(`>> Refresh error: ${error}.`);
                return { status: error.response?.status ?? 200, data: error.response?.data } as AuthResult;
            }), [authApi]);

    const updateUserInfo = useCallback((): Promise<AuthResult> => {
            return authApi.getUserInfo()
            .then(response => response.data)
            .then(data => {
                setUserInfo(data);
                return { status: 200 } as AuthResult;
            })
            .catch(error => {
                console.log(`>> Refresh user info error: ${error}.`);
                return { status: error.response?.status ?? 200, data: error.response?.data } as AuthResult;
            });
    }, [authApi]);

    const logout = () => {
        setAuthState(null, null, null);
        setUserInfo(null);
        setAuthorized(false);
    }

    useEffect(() => {
        const token = getStoredRefreshToken();
        refresh(token ?? "");
    }, [refresh]);

    useEffect(() => {
        updateUserInfo();
    }, [updateUserInfo, isAuthorized]);

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
        register,
        login,
        refresh,
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
