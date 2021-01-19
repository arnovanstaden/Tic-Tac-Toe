import React from "react";

// Styles
import "./home.scss";

export default function Square(props) {
    return (
        <div className="home">
            <div className="username">
                <p>{props.username}</p>
                <span>{props.highScore ? props.highScore : 0}</span>
            </div>
            <button className="button--blue" onClick={props.startGame}>Start Game</button>
        </div>
    );
}