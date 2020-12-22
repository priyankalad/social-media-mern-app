import React from "react";
import "./App.css";
import RegisterCon from "./containers/RegisterCon";
import LoginCon from "./containers/LoginCon";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import AccountVerificationCon from "./containers/AccountVerificationCon";
import ForgotPassCon from "./containers/ForgotPassCon";
import ResetPassCon from "./containers/ResetPassCon";
import CreatePostCon from "./containers/CreatePostCon";
import EditProfileCon from "./containers/EditProfileCon";
import MyFollowingUsersCon from "./containers/MyFollowingUsersCon";
import MyFollowersCon from "./containers/MyFollowersCon";
import MyPostsCon from "./containers/MyPostsCon";
import MyLikedPostsCon from "./containers/MyLikedPostsCon";
import Layout from "./components/Layout";
import AllPostsCon from "./containers/AllPostsCon";
import ViewOthersProfileCon from "./containers/ViewOthersProfileCon";
import NotFound from "./components/NotFound";
import FallbackComponent from "./components/FallbackComponent";
import MyAllUnfollowingUsersCon from "./containers/MyAllUnfollowingUsersCon";
import PostDetailCon from "./containers/PostDetailCon";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <Route path="/login" component={LoginCon} />
            <Route path="/register" component={RegisterCon} />
            <Route
              path="/verifyaccount/:code"
              component={AccountVerificationCon}
            />
            <Route path="/forgotpassword" component={ForgotPassCon} />
            <Route path="/resetpassword" component={ResetPassCon} />
            <Route path="/fallback" exact component={FallbackComponent} />
            <PrivateRoute path="/createpost" component={CreatePostCon} />
            <PrivateRoute path="/editprofile" component={EditProfileCon} />
            <PrivateRoute path="/following" component={MyFollowingUsersCon} />
            <PrivateRoute
              path="/allunfollowing"
              component={MyAllUnfollowingUsersCon}
            />
            <PrivateRoute path="/followers" component={MyFollowersCon} />
            <PrivateRoute path="/myposts" component={MyPostsCon} />
            <PrivateRoute path={["/home", "/"]} exact component={AllPostsCon} />
            <PrivateRoute path="/mylikedposts" component={MyLikedPostsCon} />
            <PrivateRoute
              path="/profile/:userid"
              component={ViewOthersProfileCon}
            />
            <PrivateRoute path="/post/:postId" component={PostDetailCon} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
