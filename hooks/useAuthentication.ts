import { useEffect, useState } from "react";
import { useUserContext } from "../components/users/UserContext";
import axios from "axios";
import { GetLoggedInUsersProfileUrl } from "../api/account/user";
import { setAuthorizationToken } from "../util/axiosUtils";


const useAuthentication = () => {
  const { isAuthenticated } = useUserContext();
  const { user, setUser } = useUserContext();
  const [handleAuthentication, setHandleAuthentication] = useState<boolean>(false);

  useEffect(() => {
    const loadUserProfile = async (): Promise<void> => {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        const response = await axios.get(GetLoggedInUsersProfileUrl());
        if (response && response.data) {
          setUser(response.data);
          setHandleAuthentication(true);
        }
      } catch (error) {}
    };

    if (isAuthenticated && Object.keys(user).length !== 0) {
      setHandleAuthentication(true);
    }
    if (!isAuthenticated) {
      if (
        localStorage.getItem("accessToken") != null &&
        localStorage.getItem("accessToken")!.length > 1
      ) {
        setAuthorizationToken(localStorage.getItem("accessToken"));
        //user is authenticated, load profile
        if (Object.keys(user).length === 0) {
          loadUserProfile();
        }
      }
    }
  }, []);

  return handleAuthentication;
};

export default useAuthentication;
