import React from "react";
import { get, put } from "../network";
import "./style.css";

class DislikesPage extends React.Component {
  state = {
    FoodGroup: -1,
    FoodItem: -1,
    FoodGroups: [],
    AllFoodItems: [],
    FilterdFoodItems: [],
    UserDIslikes: [],
  };

  componentDidMount() {
    get("Foods/kinds").then((res) => {
      const af = { id: -1, name: "All-Foods" };
      res.unshift(af);
      this.setState({ FoodGroups: res });
    });
    get("Foods/all").then((res) =>
      this.setState({ AllFoodItems: res, FilterdFoodItems: res })
    );
    get(`users/dislikes/${this.props.userId}`).then((res) =>
      this.setState({ UserDIslikes: res })
    );
  }
  groupChange = (e) => {
    const selectedGroup = e.target.value;
    const filterd = this.state.AllFoodItems.filter(
      (item) => item.foodKind == selectedGroup || selectedGroup == -1
    );
    this.setState({
      FoodGroup: selectedGroup,
      FilterdFoodItems: filterd,
      FoodItem: filterd[0].id,
    });
  };
  addDislike = () => {
    const dislike = [...this.state.UserDIslikes];
    const index = dislike.indexOf(this.state.FoodItem);
    if (index == -1) {
      dislike.push(this.state.FoodItem);
    }
    this.setState({ UserDIslikes: dislike });
  };

  removeDislike = (id) => {
    const dislike = [...this.state.UserDIslikes];
    const index = dislike.indexOf(id);
    if (index != -1) {
      dislike.splice(index, 1);
    }
    this.setState({ UserDIslikes: dislike });
  };

  saveDislikes = () => {
    const data = this.state.UserDIslikes.map((dislike) => Number(dislike));
    put(`users/dislikes/${this.props.userId}`, data);
  };

  render() {
    return (
      <div className="DislikesWrapper">
        <div className="group">
          <div className="question">
            <h1>Disliked Food</h1>
            <h2 className="h2">
              please choose food items that you dont want in your menu
            </h2>
          </div>
          <div className="text">
            <label htmlFor="Group">Food Group:</label>
            <select
              name="Group"
              id="Group"
              onChange={(e) => this.groupChange(e)}
            >
              {this.state.FoodGroups.map((FG) => {
                return (
                  <option key={FG.id} value={FG.id}>
                    {FG.name}
                  </option>
                );
              })}
            </select>
          </div>
          <br></br>
          <div className="text">
            <label htmlFor="Item">Food Item:</label>
            <select
              name="Item"
              id="Item"
              onChange={(e) => this.setState({ FoodItem: e.target.value })}
            >
              {this.state.FilterdFoodItems.map((FI) => {
                return (
                  <option key={FI.id} value={FI.id}>
                    {FI.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="add-and-save">
            <button className="myButton" onClick={this.addDislike}>
              Add
            </button>
            <button className="myButton" onClick={this.saveDislikes}>
              Save
            </button>
          </div>
          <ul>
            {this.state.UserDIslikes.map((UD) => {
              const food = this.state.AllFoodItems.find(
                (item) => item.id == UD
              );
              if (food) {
                return (
                  <li key={UD}>
                    {food.name}{" "}
                    <button onClick={(e) => this.removeDislike(UD)}>X</button>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default DislikesPage;
