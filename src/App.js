import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: 10000,
      allPlayers: [],
      t: [],
    };
    this.handleCalculation = this.handleCalculation.bind(this);
  }
  handleCalculation(e) {
    e.preventDefault();
    let player = [],
      point = [],
      cost = [],
      gk = [],
      def = [],
      mid = [],
      attk = [];
    const playersJson = require("./assets/players.json");
    playersJson.forEach((p, i) => {
      player.push(i);
      point.push({ i: p.points });
      cost.push({ i: p.cost });
      gk.push({ i: p.position === "Goalkeeper" });
      def.push({ i: p.position === "Defender" });
      mid.push({ i: p.position === "Midfielder" });
      attk.push({ i: p.position === "Attacker" });
    });
  }
  componentDidMount() {
    let allPlayersArr = [];
    const playersJson = require("./assets/players.json");
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
                  style={{ height: 80 }}
                />
                <p>
                  {player.name}
                  <br />
                  Price: ${player.price}
                  <br />
                  Points: {player.points}
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
