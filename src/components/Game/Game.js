import React from "react";

// Components
import Board from "../Board/Board";
import O from "../Marks/O";
import X from "../Marks/X";

// Styles
import "./game.scss";

// Images

// Helpers
import * as Gameplay from "../../helpers/gameplay";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            totalMoves: 0,
            currentScore: {
                user: 0,
                computer: 0
            },
            gameInProgress: true,
            lastWinner: undefined
        }
    }

    // Lifecycle Methods
    componentDidMount() {

        this.handleLoad()

        if (this.props.playerMarks.computer === "X" && this.state.xIsNext) {
            this.computersTurn()
        }
    }

    // Handlers

    handleSquareClick = (i, userIsNext) => {

        const squares = [...this.state.squares];
        if (Gameplay.calculateWinner(squares)) {
            return;
        } if (squares[i]) {
            return false
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState((state) => {
            return {
                ...state,
                squares: squares,
                xIsNext: !state.xIsNext,
                totalMoves: state.totalMoves + 1
            }
        }, () => {

            setTimeout(() => {
                this.checkRoundEnd(this.state);
            }, 500)

            // ComputerTurn
            if (!userIsNext && this.state.totalMoves < 9) {
                this.computersTurn()
            }
        });
        return true
    }

    handleNewGame = () => {
        // Show Warning
        this.setState({
            squares: Array(9).fill(null),
            xIsNext: true,
            totalMoves: 0,
            gameInProgress: true,
            lastWinner: undefined
        }, () => {
            Gameplay.saveGameProgress(this.state);
            if (this.props.playerMarks.computer === "X" && this.state.xIsNext) {
                this.computersTurn()
            }
        });
        console.clear()
    }

    handleExit = () => {
        const squares = [...this.state.squares];
        if (squares.includes("X") || squares.includes("O")) {
            const closeOptions = (
                <div className="container container__options">
                    <button className="button--grey" onClick={() => this.exitGame()}>Exit</button>
                    <button className="button--blue" onClick={() => this.props.hideModal()}>Continue</button>
                </div>
            )
            this.props.showModal("Exit Game", "Are you sure you want to exit game. \n Your current streak will be lost.", closeOptions)
        } else {
            this.exitGame()
        }
    }

    handleLoad = () => {
        let pastProgress = Gameplay.loadPreviousProgress();
        this.setState(pastProgress);
    }


    // Helpers

    checkRoundEnd = (state) => {
        const winner = Gameplay.calculateWinner(state.squares);
        let newScore;
        if (winner) {
            newScore = Gameplay.updateScore(state, this.props.playerMarks, winner);
            this.setState({
                currentScore: newScore,
                gameInProgress: false,
                lastWinner: winner
            }, () => {
                Gameplay.saveGameProgress(this.state);
            });
        } else if (!winner && this.state.totalMoves === 9) {
            this.setState({
                gameInProgress: false,
                lastWinner: winner
            }, () => {
                Gameplay.saveGameProgress(this.state);
            });
        }
        Gameplay.saveGameProgress(this.state);
    }

    computersTurn = () => {
        let choice;
        let moveSuccess = false;
        // simulate delay
        setTimeout(() => {
            while (moveSuccess === false) {
                choice = Math.floor(Math.random() * 9);
                moveSuccess = this.handleSquareClick(choice, true);
            }
        }, 400)
    }

    exitGame = () => {
        Gameplay.saveHighScore(this.state.currentScore.user)
        Gameplay.resetGameProgress();
        this.props.handleGameState();
        this.props.hideModal()
    }

    // Components
    PlayerMarks = () => {
        return (
            <div className={`game__players ${this.state.gameInProgress ? "" : "inactive"}`}>
                <div className={`game__players__mark ${this.state.xIsNext ? `` : `inactive`} ${this.state.gameInProgress ? `` : `inactive`}`}>
                    <X size={20} />
                    <p>{this.props.playerMarks.user === "X" ? this.props.username : `Computer`}</p>
                    <span>{this.props.playerMarks.user === "X" ? this.state.currentScore.user : this.state.currentScore.computer}</span>
                </div>
                <div className={`game__players__mark ${this.state.xIsNext ? `inactive` : ``} ${this.state.gameInProgress ? `` : `inactive`}`}>
                    <span>{this.props.playerMarks.user === "O" ? this.state.currentScore.user : this.state.currentScore.computer}</span>
                    <p>{this.props.playerMarks.user === "O" ? this.props.username : `Computer`}</p>
                    <O size={20} />
                </div>
            </div>
        )
    }

    Outcome = () => {

    }

    render() {
        return (
            <div className="game">
                <this.PlayerMarks />
                <div className="game__board">
                    <Board
                        {...this.state}
                        handleSquareClick={this.handleSquareClick}
                        handleNewGame={this.handleNewGame}
                        winner={this.state.gameInProgress ? undefined : this.state.lastWinner} />
                </div>
                <div className="game__options">
                    <div className="container container__options">
                        <button className="button--grey" onClick={this.handleExit}>Exit Game</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;




