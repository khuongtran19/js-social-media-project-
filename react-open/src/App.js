import React, { Component } from "react";
import Login from "./Login";
import Register from "./Register";
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import Logout from "./Logout";
import People from "./People";
import BlogPage from "./BlogsPage";
import { Route, Redirect, Switch } from "react-router-dom";
import { getCurrentUserId, getUser } from "./Server";
import styles from "./App.module.css";
import background from "./color.jpg";
var sectionStyle = {
  width: "100%",
  heigth: "500px",
  backgroundImage: "url(" + background + ")"
};
class App extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    this.updateCurrentUser();
  }
  updateCurrentUser = () => {
    getCurrentUserId()
      .then(getUser)
      .then(user => this.setState({ user: user || false }))
      .catch(error => this.setState({ user: false }));
  };
  clearUser = () => {
    this.setState({ user: false });
  };
  render() {
    const { user } = this.state;
    if (user === null) return null;
    return (
      <section style={sectionStyle}>
        <div className={styles.bold}>
          <div className={styles.root}>
            <div className={styles.toxnav}>
              <NavBar user={user} />
              {user ? (
                <Switch>
                  <Route
                    exact
                    path="/home"
                    render={user => <HomePage {...user} user={user} />}
                  />
                  <Route
                    exact
                    path="/logout"
                    render={user => (
                      <Logout {...user} clearUser={this.clearUser} />
                    )}
                  />
                  <Route path="/people" component={People} />
                  <Route path="/blog" component={BlogPage} />
                  {/* <Redirect to="/home" /> */}
                </Switch>
              ) : (
                <Switch>
                  <Route
                    exact
                    path="/login"
                    render={props => (
                      <Login
                        {...props}
                        updateCurrentUser={this.updateCurrentUser}
                      />
                    )}
                  />
                  <Route exact path="/register" component={Register} />
                  <Redirect to="/login" />
                </Switch>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default App;
