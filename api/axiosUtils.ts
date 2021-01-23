import { RefreshTokenUrl } from './account/auth';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { setAuthorizationToken } from '../redux/util/authorization';
 
export const handleLoginTokens = (accessToken : string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setAuthorizationToken(accessToken);
}

// Function that will be called to refresh authorization
const refreshAuthLogic = failedRequest => { 
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if(accessToken === undefined || refreshToken === undefined) {
        return null;
    }
    return axios.post(RefreshTokenUrl(), { 
    accessToken: accessToken, 
    refreshToken: refreshToken
})
.then(tokenRefreshResponse => {
    localStorage.setItem('accessToken', tokenRefreshResponse.data.accessToken);
    localStorage.setItem('refreshToken', tokenRefreshResponse.data.refreshToken);
    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.accessToken;
    return Promise.resolve();
}) };
 
// Instantiate the interceptor (you can chain it as it returns the axios instance)
createAuthRefreshInterceptor(axios, refreshAuthLogic);
 
// // Make a call. If it returns a 401 error, the refreshAuthLogic will be run, 
// // and the request retried with the new token
// axios.get('https://www.example.com/restricted/area')
//     .then(/* ... */)
//     .catch(/* ... */);