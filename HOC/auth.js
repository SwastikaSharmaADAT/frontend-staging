import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setLoggedIn,
  setShowLoggedOutNoti,
} from "../modules/auth/authSlice";
import { isLoginToken } from "../utilities/authUtils";

function withUser(Child) {
  return (props) => {
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
      if (isLoginToken()) {
        dispatch(setLoggedIn(true));
      } else {
        dispatch(setShowLoggedOutNoti(true));
        router.push({ pathname: "/", query: {reason:"loggedOutUser"} });
      }
    }, []);

    return <Child {...props}></Child>;
  };
}

export default withUser;
