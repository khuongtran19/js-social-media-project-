import React, { Component } from "react";
import Login from "./Login";
import Register from "./Register";
import HomePage from "./HomePage";
import Profile from "./Profile";
import PeopleProfile from "./PeopleProfile";
import { Route, NavLink, Switch } from "react-router-dom";
import styles from "./App.module.css";
class App extends Component {
  render() {
    return (
      <div>
        <div className="landing">
          <div>
            <ul className={styles.topnav}>
              <li>
                <NavLink className={styles.navtext} to="/home">
                  <span>Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink className={styles.navtext} to="/login">
                  <span>Login</span>
                </NavLink>
              </li>
              <li>
                <NavLink className={styles.navtext} to="/people">
                  <span>People Profile</span>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className={styles.page}>
            <Switch>
              <Route exact path="/home" component={HomePage} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/people" component={PeopleProfile} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
