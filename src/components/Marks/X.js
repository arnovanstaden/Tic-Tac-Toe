import React from 'react';

import X_img from "../../assets/images/X.svg";

const O = (props) => {
    return (
        <div>
            <img width={props.size ? props.size : 20} height={props.size ? props.size : 20} src={X_img} alt="" />
        </div>
    )
}

export default O

