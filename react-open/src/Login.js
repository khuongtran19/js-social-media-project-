import React from "react";
import PropTypes from "prop-types";
import { login } from "./Server";
import { withRouter } from "react-router-dom";
import Validation from "./Validation";
import styles from "./App.module.css";
class Login extends React.Component {
  static propTypes = {
    updateCurrentUser: PropTypes.func.isRequired
  };
  state = {
    email: "",
    password: "",
    inProgress: false,
    validation: {}
  };

  handleInputChange = item => {
    const name = item.target.name;
    const value = item.target.value;
    this.setState({
      [name]: value
    });
  };
  handleLoginClicked = () => {
    this.setState({ inProgress: true });
    const { email, password } = this.state;
    login({ email, password })
      .then(() => {
        this.props.updateCurrentUser();
      })
      .catch(err => {
        this.setState({ err: String(err), inProgress: false });
      });
  };
  handleValidationChange = validation => {
    this.setState({ validation });
  };
  register = () => {
    this.props.history.push("./register");
  };
  render() {
    const { inProgress, email, password, error, validation } = this.state;
    return (
      <Validation onChange={this.handleValidationChange}>
        <div className="Login">
          <div className="form-grid">
            <form>
              <fieldset>
                <legend>Login</legend>
                <div>Email:</div>
                <div>
                  <input
                    type="email"
                    minLength="2"
                    maxLength="100"
                    required
                    disabled={inProgress}
                    name="email"
                    value={email}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div>Password:</div>
                <div>
                  <input
                    type="text"
                    minLength="2"
                    maxLength="100"
                    name="password"
                    value={password}
                    disabled={inProgress}
                    onChange={this.handleInputChange}
                    pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!$%^&*-]).{8,}"
                  />
                </div>
                <button
                  className={styles.buttonnormal}
                  disabled={inProgress || !validation.valid}
                  onClick={this.handleLoginClicked}
                >
                  Log In
                </button>
                <button className={styles.buttonnormal} onClick={this.register}>
                  Register
                </button>
                {inProgress && <div>Processing...</div>}
                {error && <div className="error">ERROR: {error}</div>}
              </fieldset>
            </form>
          </div>
        </div>
      </Validation>
    );
  }
}

export default withRouter(Login);
