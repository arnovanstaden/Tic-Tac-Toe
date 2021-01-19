import React from "react";

// Components
import O from "../Marks/O";
import X from "../Marks/X";

// Styles
import "./square.scss";

export default function Square(props) {

    const Mark = () => {
        switch (props.value) {
            case "X":
                return <X />;
            case "O":
                return <O />;
            default:
                return null
        }
    }

    return (
        <button
            className="square"
            onClick={props.onClick}>
            <Mark />
        </button>
    );
}