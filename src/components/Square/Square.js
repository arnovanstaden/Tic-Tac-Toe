import React from "react";

// Styles
import "./square.scss";

export default function Square(props) {
    return (
        <button
            className="square"
            onClick={props.onClick}>
            {props.value}
        </button>
    );
}