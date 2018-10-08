import React from "react";
import axios from "axios";
import styles from "./App.module.css";
class Register extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    PasswordConfirm: "",
    password: "",
    success: false,
    error: false,
    first_isValid: true,
    last_isValid: true,
    email_isValid: true,
    confirmPassword_isValid: true,
    password_isValid: true
  };
  handleFirstNameChange = e => {
    const firstName = e.target.value;
    let first_isValid = false;
    if (firstName.length >= 2 && firstName.length <= 100) {
      first_isValid = true;
    }
    this.setState({ firstName, first_isValid });
  };
  handleLastNameChange = e => {
    const lastName = e.target.value;
    let last_isValid = false;
    if (lastName.length >= 1 && lastName.length <= 100) {
      last_isValid = true;
    }
    this.setState({ lastName, last_isValid });
  };
  handleEmailChange = e => {
    const email = e.target.value;
    let email_isValid = false;
    if (email.length >= 2 && email.length <= 100) {
      email_isValid = true;
    }
    this.setState({ email, email_isValid });
  };
  handlePasswordChange = e => {
    const password = e.target.value;
    let password_isValid = false;
    if (
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!$%^&*-]).{8,}/.test(
        password
      )
    ) {
      password_isValid = true;
    }

    this.setState({ password, password_isValid });
  };
  handleConfirmPasswordChange = e => {
    const PasswordConfirm = e.target.value;
    let confirmPassword_isValid = false;

    if (this.state.password === PasswordConfirm) {
      confirmPassword_isValid = true;
    }
    this.setState({ PasswordConfirm, confirmPassword_isValid });
  };
  handleLoginClicked = () => {
    axios
      .post("/api/users/register", {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        PasswordConfirm: this.state.PasswordConfirm,
        password: this.state.password
      })
      .then(response => this.push.history.push("/home"))
      .catch(error => this.setState({ success: false, error: true }));
  };
  render() {
    return (
      <div>
        <form>
          <fieldset>
            <legend>Register</legend>
            <div>First Name:</div>
            <div>
              <input
                type="text"
                value={this.state.firstName}
                onChange={this.handleFirstNameChange}
              />
              {!this.state.first_isValid && (
                <span style={{ color: "red" }}>
                  First name must from 2 to 100 characters
                </span>
              )}
            </div>
            <div>Last Name:</div>
            <div>
              <input
                type="text"
                value={this.state.lastName}
                onChange={this.handleLastNameChange}
              />
              {!this.state.last_isValid && (
                <span style={{ color: "red" }}>
                  Last name must from 1 to 100 characters
                </span>
              )}
            </div>
            <div>Email:</div>
            <div>
              <input
                type="email"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
              {!this.state.email_isValid && (
                <span style={{ color: "red" }}>Must be valid email</span>
              )}
            </div>
            <div>Password:</div>
            <div>
              <input
                type="password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
              {!this.state.password_isValid && (
                <span style={{ color: "red" }}>
                  One upper, one lower, one number, one symbol, 8 characters
                </span>
              )}
            </div>
            <div>Confirm Password:</div>
            <div>
              <input
                type="password"
                value={this.state.PasswordConfirm}
                onChange={this.handleConfirmPasswordChange}
              />
              {!this.state.confirmPassword_isValid && (
                <span style={{ color: "red" }}>
                  The Confirm Password must match the Password you input above
                </span>
              )}
            </div>
            <button
              className={styles.buttonnormal}
              disabled={
                !this.state.email_isValid ||
                !this.state.password_isValid ||
                !this.state.first_isValid ||
                !this.state.last_isValid
              }
              onClick={this.handleLoginClicked}
            >
              Register
            </button>
            <div>
              {this.state.success && (
                <h2 style={{ color: "green" }}>Success!</h2>
              )}
              {this.state.error && <h2 style={{ color: "red" }}>BAD !</h2>}
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}
export default Register;
