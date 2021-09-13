import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../App";
import { useQuery } from 'react-query';

export default class ApiService {
    static async getQuery<T>({ queryKey }: any): Promise<T> {
        const [_key, { token }] = queryKey;

        if (!token) {
            throw new Error("Can't make an authenticated request without authentication!");
        }

        const authHeader = new Headers();
        authHeader.append('Authorization', `Bearer ${token}`);

        const requestOptions: RequestInit = {
            method: 'GET',
            headers: authHeader
        };

        const response = await fetch(_key, requestOptions);

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    }
}

export const useGetRequest = <T>(requestPath: string) => {
    const authenticationContext = useContext(AuthenticationContext);

    const token = authenticationContext.state?.token;

    return useQuery<T>([requestPath, { token }], ApiService.getQuery);    
}