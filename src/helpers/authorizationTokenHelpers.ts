import { TokenData } from "../types/TokenData"

type TokensResponse = {
    access_token: string | null,
    refresh_token: string | null
}

export const saveAuthorizationData = (data : unknown | TokenData) : void => {
    localStorage.setItem('jobored-authorization-data', JSON.stringify(data))
}

export const extractAuthorizationData = () : TokenData | null => {
    const storageJson = localStorage.getItem('jobored-authorization-data')
    if(!storageJson) return null
    
    const authorizationData : TokenData = JSON.parse(storageJson);
    return authorizationData
}

export const checkAuthorizationTokens = () : TokensResponse => {
    const response : TokensResponse = {
        access_token: null,
        refresh_token: null,
    };
    
    const authorizationData = extractAuthorizationData();

    if(authorizationData){
        const {access_token, refresh_token, ttl} = authorizationData
        response.refresh_token = refresh_token
        const currentTime = new Date()
        if((ttl * 1000 - currentTime.getTime()) > 0) response.access_token = access_token
    }

    return response
}

export const getAccessToken = () : string | null => {   
    const authorizationData = extractAuthorizationData()
    if(!authorizationData) return null

    const {access_token, ttl} = authorizationData
    const currentTime = new Date()
    if((ttl * 1000 - currentTime.getTime()) <= 0) return null

    return access_token
}