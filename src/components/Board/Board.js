import React from "react";

// Components
import Square from "../Square/Square"

// Styles
import "./board.scss";


const Board = (props) => {
    let numberArray = [...Array(9).keys()]

    if (props.winner === undefined) {
        return (
            <div className="board">
                {numberArray.map(i => (
                    <Square
                        value={props.squares[i]}
                        onClick={() => { props.handleSquareClick(i) }}
                        key={i}
                    />
                ))}
            </div>
        );
    } else {
        return (
            <div className="board board--result">
                <div className="result">
                    <p>Winner : {props.winner === null ? "Draw" : props.winner}</p>
                    <div className="container container__options">
                        <button className="button--blue" onClick={() => props.handleNewGame()}>Play Again</button>
                    </div>
                </div>
            </div>
        )
    }

}


export default Board;