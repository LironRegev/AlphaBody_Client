import React from "react";
import { put } from "../network";
import "./style.css";

class PersonalDetailsBasic extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    Gender: "",
    BirthDate: "",
    Height: 140,
    Weight: 0,
    ActivityLevel: "1",
    Goal: "1",
    MealsNum: "1",
  };

 

  componentDidMount() {
    if (this.props.user.userInfo) {
      const user = this.props.user;
      this.setState({
        firstName: user.firstName,
        lastName: user.lastName,
        Gender: user.userInfo.gender,
        Height: user.userInfo.height,
        Weight: user.userInfo.weight,
        ActivityLevel: user.userInfo.activityLevel,
        Goal: user.userInfo.goal,
        MealsNum: user.userInfo.mealsNum,
      });
    }
  }

  getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  saveInfo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const ag = this.getAge(this.state.BirthDate);

    const data = {
      Gender: Number(this.state.Gender),
      Age: ag,
      Height: parseInt(this.state.Height),
      Weight: parseInt(this.state.Weight),
      ActivityLevel: Number(this.state.ActivityLevel),
      Goal: Number(this.state.Goal),
      MealsNum: Number(this.state.MealsNum),
      FirstName: this.state.firstName,
      LastName: this.state.lastName,
    };
    put(`users/userinfo/${this.props.user.id}`, data).then((res) =>
      this.props.onDetailsSaved(res)
    );
  };

  OnSetHeight = () => {
    const minHeight = 140;
    if (this.state.Height < minHeight) this.setState({ Height: minHeight });
  };

  render() {
    return (
      <div className="PersonalDetailsWrapper">
        <div className="alpha-body-html">
          <form onSubmit={(e) => this.saveInfo(e)}>
            <h1>personal information</h1>
            <div className="question">
              <label htmlFor="user" className="label">
                FirstName
              </label>
              <input
                id="user"
                type="text"
                required
                className="input"
                datatype="firstname"
                value={this.state.firstName}
                onChange={(e) => this.setState({ firstName: e.target.value })}
              />
            </div>
            <br></br>
            <div className="question">
              <label htmlFor="user" className="label">
                LastName
              </label>
              <input
                id="user"
                type="text"
                required
                className="input"
                datatype="lastname"
                value={this.state.lastName}
                onChange={(e) => this.setState({ lastName: e.target.value })}
              />
            </div>
            <br></br>
            <div className="question">
              <label>
                Birth date
                <input
                  className="form-control js-field--dob date-mask input"
                  id="DOB"
                  name="DOB"
                  type="text"
                  required
                  placeholder="MM/DD/YYYY"
                  onChange={(e) => this.setState({ BirthDate: e.target.value })}
                />
              </label>
            </div>
            <br></br>
            <div
              className="question"
              onChange={(e) => this.setState({ Gender: e.target.value })}
            >
              <input type="radio" required name="gender" id="male" value="1" />
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                required
                name="gender"
                id="female"
                value="2"
              />
              <label htmlFor="female">Female</label>
            </div>
            <br></br>
            <div className="question">
              <label>
                Height
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={this.state.Height}
                  onChange={(e) => this.setState({ Height: e.target.value })}
                  onBlur={this.OnSetHeight}
                />
                <br />
                <br />
              </label>
            </div>
            <div className="question">
              <label>
                Weight
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={this.state.Weight}
                  onChange={(e) => this.setState({ Weight: e.target.value })}
                />
                <br />
                <br />
              </label>
            </div>
            <div className="question">
              <label htmlFor="Goal">My Goal:</label>
              <select
                name="Goal"
                id="Goal"
                value={this.state.Goal}
                onChange={(e) => this.setState({ Goal: e.target.value })}
              >
                <option value="1">Lose Weight </option>
                <option value="2">Gain Weight</option>
                <option value="3">Lose Body Fat</option>
                <option value="4">Gain Muscle</option>
              </select>
            </div>
            <br></br>
            <div className="question">
              <label htmlFor="levelOfActivity">Workouts per week:</label>
              <select
                name="ActivityLevel"
                id="ActivityLevel"
                value={this.state.ActivityLevel}
                onChange={(e) =>
                  this.setState({ ActivityLevel: e.target.value })
                }
              >
                <option value="1">SuperLight (None)</option>
                <option value="2">Light (1-2)</option>
                <option value="3">Medium (2-3)</option>
                <option value="4">Heavy (3-4)</option>
                <option value="5">SuperHeavy (Every Day)</option>
              </select>
            </div>
            <br></br>
            <div className="question">
              <label htmlFor="MealsNumber">Number of Meals:</label>
              <select
                name="MealsNumber"
                id="MealsNumber"
                value={this.state.MealsNum}
                onChange={(e) => this.setState({ MealsNum: e.target.value })}
              >
                <option value="1">1 Meals Per Day</option>
                <option value="2">2 Meals Per Day</option>
                <option value="3">3 Meals Per Day</option>
                <option value="4">4 Meals Per Day</option>
                <option value="5">5 Meals Per Day</option>
                <option value="6">6 Meals Per Day</option>
              </select>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default PersonalDetailsBasic;
