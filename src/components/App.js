import React from "react";
import Signup from "./AuthFiles/Signup";
import { Container } from "react-bootstrap";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./MainPage/Dashboard";
import Login from "./AuthFiles/Login";
import PrivateRoute from "./AuthFiles/PrivateRoute";
import ForgotPassword from "./AuthFiles/ForgotPassword";
import UpdateProfile from "./AuthFiles/UpdateProfile";
import WelcomePage from "./WelcomPage/WelcomePage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/welcome" component={WelcomePage} />
        <PrivateRoute exact path="/" component={Dashboard} />
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </div>
        </Container>
      </Switch>
    </Router>
  );
}

export default App;
