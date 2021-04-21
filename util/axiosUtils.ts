import { IClaimsValues } from './../components/users/UserContext';
import axios from 'axios';
import jwt from 'jsonwebtoken';


export const decodeJwtToken = (accessToken: string) => {
  var decodedJwt = jwt.decode(accessToken);
  //TODO validate jwt 

  const { UserId, UserName, UsingMetric, FirstVisit, MemberStatusId } = decodedJwt;
  const MetricType = UsingMetric === 'True' ? 'kg' : 'lb';

  const claimValues : IClaimsValues = {
    userId: UserId,
    userName: UserName,
    kgOrLbs: MetricType,
    firstVisit: FirstVisit,
    memberStatusId: MemberStatusId
  }

  return claimValues;

}

export const handleAuthenticationTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('refreshToken', refreshToken);
    setAuthorizationToken(accessToken);
}
  
export const setAuthorizationToken = (token: string | null) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.defaults.headers.common['Content-Type'] = 'application/json';
    } else {
      delete axios.defaults.headers.common['Authorization'];
      axios.defaults.headers.common['Content-Type'] = 'application/json';
    }
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = "https://webapp.powerbuddy.gg";
  };
  