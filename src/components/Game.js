import React from "react";

// Components
import Board from "./Board"

// Styles
import "../styles/game.scss";

// Helpers
import * as Gameplay from "../helpers/gameplay"

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
            }
        }
    }


    // Lifecycle Methods
    componentDidMount() {
        // Load previous Progress
        let progress = Gameplay.loadPreviousProgress();
        this.setState(progress);

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
            Gameplay.saveGameProgress(this.state);
            this.checkRoundEnd(this.state);

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
            totalMoves: 0
        }, () => {
            if (this.props.playerMarks.computer === "X" && this.state.xIsNext) {
                this.computersTurn()
            }
        });
        console.clear()
    }

    handleExit = () => {
        Gameplay.saveHighScore(this.state.currentScore.user)
        Gameplay.resetGameProgress();
        this.props.handleGameState();
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
                currentScore: newScore
            });
            console.log("Winner: " + winner);
            console.log("Total Moves: " + this.state.totalMoves)
        } else if (!winner && this.state.totalMoves === 9) {
            console.log("draw")
        }
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

    render() {
        return (
            <div className="game">
                <div className="game__players">
                </div>
                <div className="game__board">
                    <Board
                        squares={this.state.squares}
                        onClick={(i) => this.handleSquareClick(i)} />
                </div>
                <div className="game__options">
                    <button onClick={this.handleExit}>Exit Game</button>
                    {/* <button onClick={this.handleLoad}>load</button> */}
                    <button onClick={this.handleNewGame}>Play Again</button>
                </div>
            </div>
        );
    }
}

export default Game;




