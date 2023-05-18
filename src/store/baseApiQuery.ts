import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/dist/query'
import { checkAuthorizationTokens, getAccessToken, saveAuthorizationData } from '../helpers/authorizationTokenHelpers'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://startup-summer-2023-proxy.onrender.com',
    prepareHeaders: (headers) => {
        headers.set('x-secret-key', 'GEU4nvd3rej*jeh.eqp')
        headers.set('X-Api-App-Id', 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948')
        headers.set('Authorization', `Bearer ${getAccessToken()}`)
        return headers;
    }
})

export const baseQueryWithReauth : BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async(args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && (result.error.status === 401 || result.error.status === 410)) {
        const {access_token, refresh_token} = checkAuthorizationTokens()
        if(refresh_token && !access_token){
            const refreshResult = await baseQuery(`2.0/oauth2/refresh_token/?refresh_token=${refresh_token}&client_id=2356&client_secret=v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948`, api, extraOptions)
            saveAuthorizationData(refreshResult.data)
            result = await baseQuery(args, api, extraOptions)
        } else {
            const loginResult = await baseQuery('/2.0/oauth2/password/?login=sergei.stralenia@gmail.com&password=paralect123&client_id=2356&client_secret=v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948&hr=0', api, extraOptions)
            saveAuthorizationData(loginResult.data)
            result = await baseQuery(args, api, extraOptions)
        }
    }
    return result;
}
