import React, { Component } from "react";
import "./App.css";
import { knapsack } from "./knapsack";
const playersJson = require("./assets/players.json");

// var solver = require("javascript-lp-solver/src/solver");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: 10,
      allPlayers: [],
      selectedId: [],
    };
    this.handleCalculation = this.handleCalculation.bind(this);
  }
  handleCalculation(e) {
    e.preventDefault();
    fetch("/knapsack/" + this.state.budget)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let total_cost = Object.values(data.cost).reduce((a, b) => a + b);
        console.log(total_cost);
        if (total_cost > this.state.budget) {
          alert("insufficient budget");
        } else {
          let total_points = Object.values(data.points).reduce((a, b) => a + b);
          this.setState({
            selectedId: Object.keys(data.selected),
            totalPoints: total_points,
            totalCost: total_cost,
          });
        }
      });
  }

  componentDidMount() {
    let allPlayersArr = [];
    // todo: make a csv file and iterate through it
    for (let i = 0; i < playersJson.length; i++) {
      allPlayersArr.push({
        name: playersJson[i].playerName,
        points: playersJson[i].points,
        price: playersJson[i].cost,
        imgUrl: "./assets/football players/" + playersJson[i].imgUrl,
        position: playersJson[i].position,
      });
    }
    this.setState({ allPlayers: allPlayersArr });
  }
  render() {
    return (
      <div className="App">
        <div className="calculator-container">
          <h1>Fantasy Football Calculator</h1>
          <form onSubmit={(e) => this.handleCalculation(e)}>
            <label>
              Enter Budget: &nbsp;
              <input
                type="number"
                name="budget"
                value={this.state.budget}
                onChange={(e) => this.setState({ budget: e.target.value })}
              />
            </label>
            <input type="submit" value="Calculate" />
          </form>
          {this.state.totalPoints && this.state.totalCost ? (
            <div>
              <p>Total Points:&nbsp;{this.state.totalPoints}</p>
              <p>Total Cost:&nbsp;{this.state.totalCost}</p>
            </div>
          ) : null}
          <div>
            Icons made by{" "}
            <a
              href="https://www.flaticon.com/authors/freepik"
              title="Freepik"
              className="link"
            >
              Freepik
            </a>{" "}
            from{" "}
            <a
              href="https://www.flaticon.com/"
              title="Flaticon"
              className="link"
            >
              {" "}
              www.flaticon.com
            </a>
          </div>
        </div>
        <div className="right-panel-container">
          {this.state.allPlayers.map((player, i) => {
            return (
              <div key={i} className="player-container">
                <img
                  src={require(`${player.imgUrl}`)}
                  alt={player.name}
                  className={
                    this.state.selectedId.includes(i.toString())
                      ? "img-selected"
                      : "img-notselected"
                  }
                />
                <p>
                  {player.name}
                  <br />
                  Price: ${player.price}
                  <br />
                  Points: {player.points}
                  <br />
                  {player.position}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
