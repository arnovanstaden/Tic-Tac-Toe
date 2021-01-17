import React from "react";

// Styles
import "../styles/home.scss";

export default function Square(props) {
    return (
        <div className="home">
            <h1>Home</h1>
            <button onClick={props.handleGameState}>Start Game</button>
        </div>
    );
}