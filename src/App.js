import React, { Component } from "react";
import "./App.css";
class App extends Component {
  render() {
    let allPlayers = [];
    // todo: make a csv file and iterate through it
    for (let i = 0; i < 24; i++) {
      allPlayers.push({
        name: "Lenny",
        points:54,
        price:8000,
        imgUrl: "./assets/football-player.png",
      });
    }
    return (
      <div className="App">
        <div className="calculator-container">
          <h1>Fantasy Football Calculator</h1>
          <div>Enter Budget:</div>
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
          <div className="football-container"></div>
          <div className="all-players-container">
            {allPlayers.map((player, i) => {
              return (
                <div index={i} className='player-container'>
                  <img
                    src={require(`${player.imgUrl}`)}
                    alt={player.name}
                    style={{ width: 96, height: 96 }}
                  />
                  <p>{player.name}<br/>
                  Price: ${player.price}   Points: {player.points}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
