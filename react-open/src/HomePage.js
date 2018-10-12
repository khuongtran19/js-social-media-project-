import React from "react";
import PropTypes from "prop-types";
import styles from "./App.module.css";
class HomePage extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  };
  state = {
    user: []
  };
  render() {
    return <h1 className={styles.bold}>Welcome</h1>;
  }
}
export default HomePage;
