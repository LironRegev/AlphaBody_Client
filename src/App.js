import React from "react";
import "./App.css";
import LoginAndRegisterPage from "./LoginAndRegister/LoginAndRegisterPage";
import { get } from "./network";
import PersonalDetailsBasic from "./PersonalDetails/PersonalDatailsBasic";
import RegularUserMainPage from "./RegularUserPage/RegularUserMainPage";
import DislikesPage from "./Dislikes/DIslikesPage";
import MenuPage from "./Menu/MenuPage";

class App extends React.Component {
  state = {
    user: {},
  };

  componentDidMount() {
    window.onbeforeunload = this.logout;
  }

  logout = (e) => {
    if (this.isUserLoggedIn()) {
      get(`users/logout/${this.state.user.id}`);
    }
  };

  onLogin = (res) => {
    this.setState({ user: res });
  };

  isUserLoggedIn = () => {
    return Boolean(this.state.user.id);
  };

  isUserMissingInfo = () => {
    return Boolean(!this.state.user.userInfo);
  };

  onDetailsSaved = (newUser) => {
    this.setState({ user: newUser });
  };

  render() {
    return (
      <div className="whole-page">
        <div className="main">
          <img
            src="https://i.ibb.co/8bywFqy/Logo.jpg"
            alt=""
            style={{ width: "55%", height: "55%" }}
          />
        </div>
        {/* <LoginAndRegisterPage onLogin={this.onLogin} /> */}
        {/* {<MenuPage />} */}
        {/* {<DislikesPage />} */}
        {/* {<RegularUserMainPage />} */}
        {/* {<PersonalDetailsBasic />} */}

        {!this.isUserLoggedIn() && (
          <LoginAndRegisterPage onLogin={this.onLogin} />
        )}

        {this.isUserLoggedIn() && this.isUserMissingInfo() && (
          <PersonalDetailsBasic
            user={this.state.user}
            onDetailsSaved={this.onDetailsSaved}
          />
        )}

        {this.isUserLoggedIn() && !this.isUserMissingInfo() && (
          <RegularUserMainPage
            user={this.state.user}
            onDetailsSaved={this.onDetailsSaved}
          />
        )}

        {/* <AdminPage style={hidden by default}></AdminPage> */}
        <div className="secondery">
          <img
            src="https://i.ibb.co/ypJNqqd/imageedit-23-4602200022.jpg"
            alt=""
            style={{ position: "fixed", bottom: 0, left: 0 }}
          />
        </div>
      </div>
    );
  }
}

export default App;
