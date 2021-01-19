import React from 'react';

import O_img from "../../assets/images/O.svg";

const O = (props) => {
    return (
        <div>
            <img width={props.size ? props.size : 20} height={props.size ? props.size : 20} src={O_img} alt="" />
        </div>
    )
}

export default O
