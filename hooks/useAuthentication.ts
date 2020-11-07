import { loadUserProfile } from "./../redux/area/account/userActions";
import { useDisclosure } from "@chakra-ui/core";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IAppState } from "../redux/store";
import { setAuthorizationToken } from "../redux/util/authorization";

const useAuthentication = () => {
  const { isAuthenticated } = useSelector((state: IAppState) => state.state);
  const { user } = useSelector((state: IAppState) => state.state);
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const dispatcher = useDispatch();

  useEffect(() => {
    if (isAuthenticated && Object.keys(user).length !== 0) {
      return;
    }
    if (!isAuthenticated) {
      if (
        localStorage.getItem("token") != null &&
        localStorage.getItem("token")!.length > 1
      ) {
        setAuthorizationToken(localStorage.getItem("token"));
        //user is authenticated, load profile
        if (Object.keys(user).length === 0) {
          dispatcher(loadUserProfile());
        }
      }
      setUserAuthenticated(true);
    }
  }, [isAuthenticated]);

  return isAuthenticated;
};

export default useAuthentication;
