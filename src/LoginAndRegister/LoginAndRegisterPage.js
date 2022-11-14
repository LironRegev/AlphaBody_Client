import React from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import "./style.css";

class LoginAndRegisterPage extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <div className="alpha-body-html">
          <input
            id="tab-1"
            type="radio"
            name="tab"
            className="sign-in"
            defaultChecked
          />
          <label htmlFor="tab-1" className="tab">
            Sign In
          </label>
          <input id="tab-2" type="radio" name="tab" className="sign-up" />
          <label htmlFor="tab-2" className="tab">
            Sign Up
          </label>
          <div className="login-form">
            <LoginPage onLogin={this.props.onLogin} />
            <RegisterPage onRegister={this.props.onLogin} />
          </div>
        </div>
      </div>
    );
  }
}

export default LoginAndRegisterPage;
