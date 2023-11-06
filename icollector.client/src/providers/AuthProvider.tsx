import { createContext, FunctionComponent, PropsWithChildren, useEffect, useMemo, useState } from "react";
import axios, { AxiosInstance } from "axios";

const ApiPrefix = "/api/identity";

export const ApiPaths = {
    Register: `${ApiPrefix}/register`,
    Login: `${ApiPrefix}/login`,
    Refresh: `${ApiPrefix}/refresh`
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

export interface AuthContextType {
    register: (email: string, password: string) => Promise<AuthResult>,
    login: (email: string, password: string) => Promise<AuthResult>,
    refresh: () => Promise<AuthResult>,
    logout: () => void,
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

    const token = getStoredRefreshToken();
    useEffect(() => {
        refresh(token ?? "");
    }, [token]);
    
    const contextValue = useMemo(() => ({ register, login, refresh, logout, isAuthorized, authAxios: instance } as AuthContextType), [isAuthorized, instance]);
    
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
