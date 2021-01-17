import React from "react";

// Components
import Home from "./Home";
import Game from "./Game";
import Modal from "./Game";

// Styles & Fonts
import "../styles/app.scss";

// Helpers
import * as Gameplay from "../helpers/gameplay"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // userName: prompt("Please enter your name", "Player 1"),
            userName: "Player 1",
            // playerMarks: {
            //     user: null,
            //     computer: null
            // },
            playerMarks: {
                user: null,
                computer: null
            },
            highScore: {
                wins: null
            },
            activeGame: Gameplay.getGameState(),
            showModal: true
        }
    }

    // Handlers

    handleGameState = () => {

        // Change Active Game State
        let currentState = this.state.activeGame
        Gameplay.saveGameState(!currentState)
        this.setState({
            activeGame: !currentState,
        })

        // Get Mark Choice
        if (!currentState) {
            let userMark = prompt("Will you play with 'X' or 'O'?", "X");
            this.setState({
                playerMarks: {
                    user: userMark === "X" ? "X" : "O",
                    computer: userMark === "X" ? "O" : "X",
                }
            })
        }
    }

    render() {
        return (
            <main className="app" >
                {this.state.activeGame
                    ? <Game {...this.state} handleGameState={this.handleGameState} />
                    : <Home handleGameState={this.handleGameState} />}
                {this.state.showModal
                    ? <Modal />
                    : null
                }
            </main>
        )
    }
}


export default App;