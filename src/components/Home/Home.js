import React from "react";

// Styles
import "./home.scss";

export default function Square(props) {
    return (
        <div className="home">
            <h1>Tic Tac Toe</h1>
            <button className="button--blue" onClick={props.handleGameState}>Start Game</button>
        </div>
    );
}