import React from "react";

// Components
import Square from "./Square"

// Styles
import "../styles/board.scss";


const Board = (props) => {

    let numberArray = [...Array(9).keys()]

    return (
        <div className="board">
            {numberArray.map(i => (
                <Square
                    value={props.squares[i]}
                    onClick={() => { props.onClick(i) }}
                    key={i}
                />
            ))}
        </div>
    );
}


export default Board;