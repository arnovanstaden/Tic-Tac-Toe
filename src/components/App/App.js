import React from "react";

// Components
import Home from "../Home/Home";
import Game from "../Game/Game";
import Modal from "../Modal/Modal";

// Styles & Fonts
import "./app.scss";

// Helpers
import * as Gameplay from "../../helpers/gameplay"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
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
            modal: {
                show: false,
                content: null
            }
        }
    }

    // Handlers

    componentDidMount = () => {
        if (!this.state.username) {
            let options = (
                <div className="container container__column">
                    <input />
                    <button className="button--blue" onClick={this.saveUsername}>Save Username</button>
                </div >
            )
            this.showModal("Set Username", "Enter your Username", options)
        }
    }

    // Helpers
    saveUsername = () => {
        // this.setState({
        //     username: 
        // })
    }

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

    // Modal
    showModal = (heading, text, options) => {
        this.setState({
            modal: {
                show: true,
                content: {
                    heading,
                    text,
                    options
                }
            }
        })
    }

    hideModal = () => {
        this.setState({
            modal: {
                show: false
            }
        })
    }

    render() {
        return (
            <main className="app" >
                {this.state.activeGame
                    ? <Game {...this.state}
                        handleGameState={this.handleGameState}
                        showModal={this.showModal}
                        hideModal={this.hideModal} />
                    : <Home handleGameState={this.handleGameState} />}
                {this.state.modal.show
                    ? <Modal>
                        <h3>{this.state.modal.content.heading}</h3>
                        <p>{this.state.modal.content.text}</p>
                        {this.state.modal.content.options}
                    </Modal>
                    : null
                }
            </main>
        )
    }
}


export default App;