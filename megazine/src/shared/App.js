import React from "react";
import "./App.css";

import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import PostList from "../pages/PostList";
import Login from "../pages/Login";
import Singup from "../pages/Singup";
import PostWrite from "../pages/PostWrite";
import PostDetail from "../pages/PostDetail";

import Header from "../components/Header";
import Permit from "./Permit";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { apiKey } from "./firebase";
import { Button } from "../elements";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function App() {
  const dispatch = useDispatch();

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  //로그인 상태 맞으면 로그인 유지
  React.useEffect(() => {
    if (is_session) {
      dispatch(userActions.loginCheckFB());
    }
  }, []);

  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <Header />
        <Route path="/" exact component={PostList} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Singup} />
        <Route path="/write" exact component={PostWrite} />
        <Route path="/write/:id" component={PostWrite} />
        <Route path="/post/:id" component={PostDetail} />
      </ConnectedRouter>
      <Permit>
        <Button
          is_float
          _onClick={() => {
            history.push("/write");
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </Permit>
    </React.Fragment>
  );
}

export default App;
