import React from "react";
import { post } from "./network";

class TestPage extends React.Component {
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
      <div className="wrapper">
        <div class="alpha-body-html">
          <div className="group">
            <label htmlFor="user" className="label">
              FirstName
            </label>
            <input
              id="user"
              type="text"
              className="input"
              datatype="firstname"
              value={this.state.userName}
              onChange={(e) => this.setState({ userName: e.target.value })}
            />
          </div>
          <div className="group">
            <label htmlFor="user" className="label">
              LastName
            </label>
            <input
              id="user"
              type="text"
              className="input"
              datatype="lastname"
              value={this.state.userName}
              onChange={(e) => this.setState({ userName: e.target.value })}
            />
          </div>
          <div className="group">
            <input type="radio" name="gender" id="male" />
            <label for="male">Male</label>
            <input type="radio" name="gender" id="female" />
            <label for="female">Female</label>
          </div>
          <div class="form-group">
            <label>
              Birth date <small class="text-muted">mm/dd/yyyy</small>
              <input
                class="form-control js-field--dob date-mask"
                id="DOB"
                name="DOB"
                type="text"
                required
              />
            </label>
          </div>
          <div>
            <label for="Goal">My Goal:</label>
            <select name="Goal" id="Goal">
              <option value="WeightLose">Lose Weight </option>
              <option value="WeightGain">Gain Weight</option>
              <option value="BodyFatLose">Lose Body Fat</option>
              <option value="MuscleGain">Gain Muscle</option>
            </select>
          </div>
          <div>
            <label for="levelOfActivity">Workouts per week:</label>
            <select name="ActivityLevel" id="ActivityLevel">
              <option value="SuperLight">SuperLight (None)</option>
              <option value="Light">Light (1-2)</option>
              <option value="Medium">Medium (2-3)</option>
              <option value="Heavy">Heavy (3-4)</option>
              <option value="SuperHeavy">SuperHeavy (Every Day)</option>
            </select>
          </div>
          <div>
            <label for="MealsNumber">Number of Meals:</label>
            <select name="ActivityLevel" id="ActivityLevel">
              <option value="Two">2 Meals Per Day</option>
              <option value="Three">3 Meals Per Day</option>
              <option value="Four">4 Meals Per Day</option>
              <option value="Five">5 Meals Per Day</option>
              <option value="Six">6 Meals Per Day</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default TestPage;
