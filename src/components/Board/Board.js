import React from "react";
import classNames from "classnames";

// Components
import Square from "../Square/Square";
import Flip from 'react-reveal/Flip';
import O from "../Marks/O";
import X from "../Marks/X";

// Helpers
import * as Gameplay from "../../helpers/gameplay";

// Styles
import "./board.scss";


const Board = (props) => {
    let numberArray = [...Array(9).keys()];

    const boardClasses = classNames(
        "board",
        { "board--flip": props.winner === undefined ? false : true }
    )

    const WinnerMark = () => {
        let mark;
        switch (props.winner) {
            case "X":
                return <X size={50} />
            case "O":
                return <O size={50} />
            case null:
                return (
                    <div className="result__draw">
                        <X size={40} />
                        <O size={40} />
                    </div>
                )
            default:
                return null
        }
    }

    const NewHighScore = () => {
        let highScore = Gameplay.getHighScore();
        if (highScore < props.currentScore.user) {
            return (
                <div className="result__high-score">
                    <p>New High Score:</p>
                    <span>{props.currentScore.user}</span>
                </div>
            )
        }
        return null
    }


    return (
        <Flip left>
            <div className={boardClasses}>
                <div className="board__inner">
                    <div className="board__inner__front">
                        {numberArray.map(i => (
                            <Square
                                value={props.squares[i]}
                                onClick={() => { props.handleSquareClick(i) }}
                                key={i}
                            />
                        ))}
                    </div>
                    <div className="board__inner__back">
                        <div className="result">
                            <h3>{props.winner === null ? "Draw" : "Winner"}</h3>
                            <WinnerMark />
                            <NewHighScore />
                            <div className="container container__options">
                                <button className="button--blue" onClick={() => props.handleNewGame()}>Play Again</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Flip>
    );
}


export default Board;