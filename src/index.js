import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


// Components
import App from "./components/App/App";

// Styles
import "typeface-quicksand";
import "./index.scss";

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

serviceWorkerRegistration.register();
