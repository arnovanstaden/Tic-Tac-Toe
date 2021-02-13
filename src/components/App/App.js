import React from "react";

// Components
import Home from "../Home/Home";
import Game from "../Game/Game";
import Modal from "../Modal/Modal";
import O from "../Marks/O";
import X from "../Marks/X";
import Background from "../Background/Background";
import Logo from "../../assets/images/Logo.svg";

// Styles & Fonts
import "./app.scss";

// Helpers
import * as Gameplay from "../../helpers/gameplay"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            playerMarks: {
                user: null,
                computer: null
            },
            activeGame: Gameplay.loadGameSettings() === null ? false : Gameplay.loadGameSettings().activeGame,
            modal: {
                show: false,
                content: null
            }
        }
    }

    // Lifecycle Methods

    componentDidMount = () => {
        this.handleLoad()
    }

    // Handlers


    handleLoad = () => {
        const settings = Gameplay.loadGameSettings();
        if (settings && settings.username) {
            this.setState({
                ...settings,
                modal: {
                    show: false,
                    content: null
                }
            })
        } else {
            let options = (
                <div className="container container__column">
                    <input name="name" id="username" type="text" onChange={this.handleChange.bind(this)} />
                    <button className="button--blue" onClick={() => this.hideModal()}>Save Username</button>
                </div >
            )
            this.showModal("Choose Username", "Enter your Username", options)
        }
    }

    handleChange = (event) => {
        this.setState({
            username: event.target.value
        }, () => {
            Gameplay.saveGameSettings(this.state)
        });
    }

    handleGameState = () => {
        // Change Active Game State
        let currentState = this.state.activeGame
        this.setState({
            activeGame: !currentState,
        }, () => {
            Gameplay.saveGameSettings(this.state)
        })
    }

    // Player Marks
    getPlayerMarks = () => {
        const options = (
            <div className="container player-marks container__options">
                <button onClick={() => this.setPlayerMarks("X")}>
                    <X />
                </button>
                <button onClick={() => this.setPlayerMarks("O")}>
                    <O />
                </button>
            </div >
        );
        this.showModal("Player Marks", `${this.state.username}, do you want to be X's or O's?`, options)
    }

    setPlayerMarks = (userMark) => {
        this.hideModal();
        this.setState({
            playerMarks: {
                user: userMark === "X" ? "X" : "O",
                computer: userMark === "X" ? "O" : "X",
            }
        }, () => {
            Gameplay.saveGameSettings(this.state);
            this.handleGameState()
        })
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
                <Background />
                <div className="app__heading">
                    <img src={Logo} alt="Tickity Tackity Logo" />
                    <h1>Tickity Tackity</h1>
                </div>

                {this.state.activeGame
                    ?
                    <Game {...this.state}
                        handleGameState={this.handleGameState}
                        showModal={this.showModal}
                        hideModal={this.hideModal} />

                    :
                    <Home
                        startGame={this.getPlayerMarks}
                        username={this.state.username}
                        highScore={Gameplay.getHighScore()}
                    />
                }
                {this.state.modal.show
                    ?
                    <Modal>
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