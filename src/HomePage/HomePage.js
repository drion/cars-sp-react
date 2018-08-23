import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import CarTable from "./CarTable";
import carActions from "../_actions/car.actions";

import "../_styles/HomePage.scss";

class HomePage extends React.Component {
    componentDidMount() {
        this.props.getCarsList();
    }

    render() {
        const { cars } = this.props;

        return (
            <div className="home-page">
                <CarTable cars={cars} />
            </div>
        );
    }
}

HomePage.propTypes = {
    getCarsList: PropTypes.func.isRequired,
    cars: PropTypes.shape({}).isRequired
};

const mapStateToProps = cars => ({
    cars
});

export default connect(
    mapStateToProps,
    { getCarsList: carActions.getCarsList }
)(HomePage);
