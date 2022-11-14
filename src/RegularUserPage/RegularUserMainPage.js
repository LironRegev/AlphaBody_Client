import React from "react";
import PersonalDetailsBasic from "../PersonalDetails/PersonalDatailsBasic";
import DislikesPage from "../Dislikes/DIslikesPage";
import MenuPage from "../Menu/MenuPage";
import "./style.css";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";

class RegularUserMainPage extends React.Component {
  state = {
    SelectedPage: "",
  };

  setSelectedPage = (page) => {
    this.setState({ SelectedPage: page });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="RegularUserMainPageWrapper">
          <nav>
            <ul>
              <li className="Menu-Btn">
                <span>
                  <Link to="Main/Menu">MENU</Link>
                </span>
              </li>
              <li className="Dislike-Btn">
                <span>
                  <Link to="Main/Dislikes">DISLIKES</Link>
                </span>
              </li>
              <li className="Details-Btn">
                <span>
                  <Link to="Main/Details">DETAILS</Link>
                </span>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route
              path="Main/Dislikes"
              element={<DislikesPage userId={this.props.user.id} />}
            ></Route>
            <Route
              path="Main/Details"
              element={
                <PersonalDetailsBasic
                  user={this.props.user}
                  onDetailsSaved={this.props.onDetailsSaved}
                />
              }
            ></Route>
            <Route
              path="Main/Menu"
              element={<MenuPage user={this.props.user} />}
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default RegularUserMainPage;
