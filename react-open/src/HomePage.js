import React from "react";
import axios from "axios";
import styles from "./App.module.css";

class HomePage extends React.Component {
  state = {
    id: [],
    firstName: [],
    lastName: [],
    email: [],
    username: []
  };
  componentDidMount() {
    axios.get("/api/tests/auth/current").then(res => {
      const id = res.data.item.actualUserId;
      axios.get("/api/users/" + id).then(res => {
        const firstName = res.data.item.firstName;
        const lastName = res.data.item.lastName;
        const email = res.data.item.email;
        this.setState({ firstName, lastName, email });
      });
    });
  }
  logoutSuccess = () => {
    axios
      .get("/api/users/logout")
      .then(() => this.props.history.push("/login"));
  };
  profile = () => {
    this.props.history.push("/profile");
  };
  people = () => {
    this.props.history.push("/people");
  };
  render() {
    return (
      <div>
        <button className={styles.buttonlogout} onClick={this.logoutSuccess}>
          Log Out
        </button>
        <div>Welcome, {this.state.lastName}</div>
        <button className={styles.buttonnormal} onClick={this.profile}>
          Create New Profile
        </button>
        <button className={styles.buttonnormal} onClick={this.people}>
          Check People Profile
        </button>
      </div>
    );
  }
}
export default HomePage;
