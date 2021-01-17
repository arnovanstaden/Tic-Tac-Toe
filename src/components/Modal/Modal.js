import React from 'react';

// Styles
import "./modal.scss";

const Modal = (props) => {
    return (
        <div className="modal">
            <div className="modal__background"></div>
            <div className="modal__content">
                {props.children}
            </div>
        </div>
    )
}

export default Modal
