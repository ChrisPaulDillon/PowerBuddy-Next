
import { API_BASE } from '../../redux/actionTypes';

const baseUrl = `${API_BASE}Account/FriendsList`;

export const GetUserFriendsListUrl = () => `${baseUrl}`;

export const GetUserFriendRequestsUrl = () => `${baseUrl}/Pending`;

export const SendFriendRequestUrl = (friendUserId: string) => `${baseUrl}/Request/${friendUserId}`;

export const SendFriendResponseUrl = (friendUserId: string) => `${baseUrl}/Response/${friendUserId}`;