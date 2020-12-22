import React from "react";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../redux/allActions";
import Header from "../components/Header";

// let logout = dispatch => {
//   dispatch(allActions.login.logout);
// };

let HeaderCon = props => {
  const dispatch = useDispatch();

  let handleLogout = () => dispatch(allActions.userProfileActions.logout());

  const { displayName, username, profilePicPath, isLoggedIn } = useSelector(
    ({
      userProfile: {
        user: { displayName, username, profilePicPath },
        isLoggedIn
      }
    }) => ({ displayName, username, profilePicPath, isLoggedIn })
  );
  const classDisplay = isLoggedIn ? "contents" : "none";
  return (
    <Header
      handleLogout={handleLogout}
      classDisplay={classDisplay}
      profilePicPath={profilePicPath}
      displayName={displayName}
      username={username}
      profilePicPath={profilePicPath}
    />
  );
};

export default HeaderCon;
