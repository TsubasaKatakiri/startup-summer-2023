import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/dist/query'
import { checkAuthorizationTokens, getAccessToken, saveAuthorizationData } from '../helpers/authorizationTokenHelpers'
import { CLIENT_HR, CLIENT_ID, CLIENT_LOGIN, CLIENT_PASSWORD, CLIENT_SECRET, SECRET_KEY } from '../constants/constants'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://startup-summer-2023-proxy.onrender.com',
    prepareHeaders: (headers) => {
        headers.set('x-secret-key', SECRET_KEY)
        headers.set('X-Api-App-Id', CLIENT_SECRET)
        headers.set('Authorization', `Bearer ${getAccessToken()}`)
        return headers;
    }
})

export const baseQueryWithReauth : BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async(args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && (result.error.status === 401 || result.error.status === 410)) {
        const {access_token, refresh_token} = checkAuthorizationTokens()
        if(refresh_token && !access_token){
            const refreshResult = await baseQuery(`2.0/oauth2/refresh_token/?refresh_token=${refresh_token}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`, api, extraOptions)
            saveAuthorizationData(refreshResult.data)
            result = await baseQuery(args, api, extraOptions)
        } else {
            const loginResult = await baseQuery(`/2.0/oauth2/password/?login=${CLIENT_LOGIN}&password=${CLIENT_PASSWORD}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&hr=${CLIENT_HR}`, api, extraOptions)
            saveAuthorizationData(loginResult.data)
            result = await baseQuery(args, api, extraOptions)
        }
    }
    return result;
}
