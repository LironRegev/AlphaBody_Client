import React from "react";
import { get, post, put } from "../network";
import "./style.css";

class Menu extends React.Component {
  state = {
    AllFoodItems: [],
    UserMenu: {},
    MenuTotalGrams: 0,
    MenuTotalCal: 0,
    MenuTotalProtein: 0,
    MenuTotalCarbs: 0,
    MenuTotalFat: 0,
    MenuTotalChol: 0,
    MenuTotalFibers: 0,
  };

  componentDidMount() {
    get("Foods/all").then((res) => this.setState({ AllFoodItems: res }));
    get(`users/menu/${this.props.user.id}`).then((res) =>
      this.setState({ UserMenu: res })
    );
  }

  generateNewMenu = () => {
    post(`users/menu/${this.props.user.id}`).then((res) =>
      this.setState({ UserMenu: res })
    );
  };

  saveMenu = () => {
    put(`users/menu/${this.props.user.id}`, this.state.UserMenu);
  };

  renderMenu = () => {
    let menuTotalGrams = 0;
    let menuTotalCal = 0;
    let menuTotalProtein = 0;
    let menuTotalCarbs = 0;
    let menuTotalFat = 0;
    let menuTotalChol = 0;
    let menuTotalFibers = 0;

    return (
      <>
        {this.state.UserMenu.meals.map((meal) => {
          let mealTotalGrams = 0;
          let mealTotalCal = 0;
          let mealTotalProtein = 0;
          let mealTotalCarbs = 0;
          let mealTotalFat = 0;
          let mealTotalChol = 0;
          let mealTotalFibers = 0;

          return (
            <>
              <tr>
                <td className="meal-time">{meal.mealTime}</td>
              </tr>
              {this.state.AllFoodItems.length > 0 &&
                meal.mealItems.map((item) => {
                  const food = this.state.AllFoodItems.find(
                    (food) => food.id == item.foodId
                  );

                  const multiplier = item.grams / food.grams;
                  const cal = (food.calories * multiplier).toFixed();
                  const protein = (food.proteinGrams * multiplier).toFixed(1);
                  const carbs = (food.carbsGrams * multiplier).toFixed(1);
                  const fat = (food.fatGrams * multiplier).toFixed(1);
                  const chol = (
                    food.cholesterolMilligram * multiplier
                  ).toFixed();
                  const fibers = (food.fibers * multiplier).toFixed();

                  mealTotalGrams += Number(item.grams);
                  mealTotalCal += Number(cal);
                  mealTotalProtein += Number(protein);
                  mealTotalCarbs += Number(carbs);
                  mealTotalFat += Number(fat);
                  mealTotalChol += Number(chol);
                  mealTotalFibers += Number(fibers);

                  menuTotalGrams += mealTotalGrams;
                  menuTotalCal += mealTotalCal;
                  menuTotalProtein += mealTotalProtein;
                  menuTotalCarbs += mealTotalCarbs;
                  menuTotalFat += mealTotalFat;
                  menuTotalChol += mealTotalChol;
                  menuTotalFibers += mealTotalFibers;

                  return (
                    <tr>
                      <td>{food.name}</td>
                      <td>{item.grams}</td>
                      <td>{cal}</td>
                      <td>{protein}</td>
                      <td>{carbs}</td>
                      <td>{fat}</td>
                      <td>{chol}</td>
                      <td>{fibers}</td>
                    </tr>
                  );
                })}
              <tr className="meal-total-row">
                <td>Total</td>
                <td>{mealTotalGrams.toFixed()}</td>
                <td>{mealTotalCal.toFixed()}</td>
                <td>{mealTotalProtein.toFixed(1)}</td>
                <td>{mealTotalCarbs.toFixed(1)}</td>
                <td>{mealTotalFat.toFixed(1)}</td>
                <td>{mealTotalChol.toFixed()}</td>
                <td>{mealTotalFibers.toFixed()}</td>
              </tr>
            </>
          );
        })}
        <tr className="menu-total-row">
          <td>Menu Total</td>
          <td>{menuTotalGrams.toFixed()}</td>
          <td>{menuTotalCal.toFixed()}</td>
          <td>{menuTotalProtein.toFixed(1)}</td>
          <td>{menuTotalCarbs.toFixed(1)}</td>
          <td>{menuTotalFat.toFixed(1)}</td>
          <td>{menuTotalChol.toFixed()}</td>
          <td>{menuTotalFibers.toFixed()}</td>
        </tr>
      </>
    );
  };

  render() {
    return (
      <div className="MenuPageWrapper">
        <div className="alpha-body-html">
          <h2 className="Menu-Discription">
            Basal Metabolic Rate (BMR) Calculator estimates the amount of energy
            (calories) expended while at rest in a neutral environment, and in a
            post-absorptive state
          </h2>
          <h1 className="BMR">
            your BMR is: {this.props.user.userInfo.bmr.toFixed()}
          </h1>

          <button className="MenuButton" onClick={this.generateNewMenu}>
            New Menu
          </button>
          <button className="MenuButton" onClick={this.saveMenu}>
            Save Menu
          </button>
          <button className="MenuButton">Download</button>
          <div className="">
            <table className="menu-table">
              <thead>
                <tr>
                  <th style={{ width: "23%" }}></th>
                  <th style={{ width: "11%" }}>GRAMS</th>
                  <th style={{ width: "11%" }}>CALORIES</th>
                  <th style={{ width: "11%" }}>PROTEIN</th>
                  <th style={{ width: "11%" }}>CARBS</th>
                  <th style={{ width: "11%" }}>FAT</th>
                  <th style={{ width: "11%" }}>CHOLESTEROL</th>
                  <th style={{ width: "11%" }}>FIBERS</th>
                </tr>
              </thead>
              <tbody>{this.state.UserMenu.meals && this.renderMenu()}</tbody>
            </table>
            <br></br>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
