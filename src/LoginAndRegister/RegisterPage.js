import React from "react";
import { post } from "../network";

class RegisterPage extends React.Component {
  state = {
    newuserName: "",
    password: "",
    repeatpassword: "",
    emailaddress: "",
  };

  isValidEmail = () => {
    return /\S+@\S+\.\S+/.test(this.state.emailaddress);
  };

  isSamePassword = () => {
    return this.state.password == this.state.repeatpassword;
  };

  isValidUsername = () => {
    return this.state.newuserName.length >= 2;
  };

  register = () => {
    if (
      this.isSamePassword() &&
      this.isValidEmail() &&
      this.isValidUsername()
    ) {
      const un = this.state.newuserName;
      const pass = this.state.password;
      const email = this.state.emailaddress;
      const data = { userName: un, password: pass, emailaddress: email };
      post("users/register", data).then((res) => this.props.onRegister(res));
    } else if (!this.isValidUsername()) {
      alert("Username must be over 1 letter ");
    } else if (!this.isSamePassword()) {
      alert("Passwords dont match");
    } else if (!this.isValidEmail()) {
      alert("Email is not Valid");
    }
  };

  render() {
    return (
      <div className="sign-up-htm">
        <div className="group">
          <label htmlFor="user" className="label">
            Username
          </label>
          <input
            id="user"
            type="text"
            className="input"
            datatype="username"
            value={this.state.newuserName}
            onChange={(e) => this.setState({ newuserName: e.target.value })}
          />
        </div>
        <div className="group">
          <label htmlFor="pass" className="label">
            Password
          </label>
          <input
            id="pass"
            type="password"
            className="input"
            data-type="password"
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>
        <div className="group">
          <label htmlFor="repeatpass" className="label">
            Repeat Password
          </label>
          <input
            id="repeatpass"
            type="password"
            className="input"
            data-type="repeatpassword"
            value={this.state.repeatpassword}
            onChange={(e) => this.setState({ repeatpassword: e.target.value })}
          />
        </div>
        <div className="group">
          <label htmlFor="email" className="label">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className="input"
            data-type="email"
            value={this.state.emailaddress}
            onChange={(e) => this.setState({ emailaddress: e.target.value })}
          />
        </div>
        <div className="group">
          <input
            type="submit"
            disabled={this.state.password != this.state.repeatpassword}
            className="button"
            value="Sign Up"
            onClick={this.register}
          />
        </div>
        <div className="hr"></div>
        <div className="foot-lnk">
          <a htmlFor="tab-1">Already Member?</a>
        </div>
      </div>
    );
  }
}

export default RegisterPage;
