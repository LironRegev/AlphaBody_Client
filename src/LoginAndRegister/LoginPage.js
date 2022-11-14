import React from "react";
import { post } from "../network";

class LoginPage extends React.Component {
  state = {
    userName: "",
    password: "",
  };

  login = () => {
    const un = this.state.userName;
    const pass = this.state.password;
    const data = { userName: un, password: pass };
    post("users/login", data).then((res) => this.props.onLogin(res));
  };

  render() {
    return (
      <div className="sign-in-htm">
        <div className="group">
          <label htmlFor="user" className="label">
            Username
          </label>
          <input
            id="user"
            type="text"
            className="input"
            datatype="username"
            value={this.state.userName}
            onChange={(e) => this.setState({ userName: e.target.value })}
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
          <input id="check" type="checkbox" className="check" defaultChecked />
          <label htmlFor="check">
            <span className="icon"></span> Keep me Signed in
          </label>
        </div>
        <div className="group">
          <input
            type="submit"
            className="button"
            value="Sign In"
            onClick={this.login}
          />
        </div>
        <div className="hr"></div>
        <div className="foot-lnk">
          <a href="#htmlForgot">Forgot Password?</a>
        </div>
      </div>
    );
  }
}

export default LoginPage;
