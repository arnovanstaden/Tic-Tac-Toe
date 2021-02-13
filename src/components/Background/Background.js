import React from 'react';

import "./background.scss";
import X_img from "../../assets/images/X.svg";
import O_img from "../../assets/images/O.svg";


export default function Background() {
    return (
        <div className="background">
            <svg width="100%" height="100%">
                <defs>
                    <pattern id="pattern-image" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                        <image href={X_img} x="0" y="0" width="25" height="25" />
                        <image href={O_img} x="100" y="100" width="25" height="25" />
                    </pattern>
                </defs>
                <rect className="background_rect" x="0" y="0" width="100%" height="100%" fill="url(#pattern-image)" />
            </svg>
        </div >
    )
}
