import PropTypes from "prop-types";
import React from "react";
import { Route } from "react-router";

import HomePage from "../HomePage/HomePage";
import Header from "../_components/general/Header";

import "../_styles/main.scss";

const App = ({ location }) => (
    <div className="container">
        <Header />
        <Route location={location} exact path="/" component={HomePage} />
    </div>
);

App.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired
};

export default App;
