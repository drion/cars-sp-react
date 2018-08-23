import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import CarTable from "./CarTable";
import carActions from "../_actions/car.actions";

import "../_styles/HomePage.scss";

class HomePage extends React.Component {
    componentDidMount() {
        this.props.getCarsList();
        this.props.getCategoriesList();
        this.props.getMakesList();
        this.props.getModelsList();
    }

    render() {
        const { cars, categories, carMakes, carModels } = this.props;

        const isLoading =
            cars.isLoading ||
            categories.isLoading ||
            carMakes.isLoading ||
            carModels.isLoading;

        return (
            <div className="home-page">
                {!isLoading && (
                    <CarTable
                        cars={cars}
                        categories={categories}
                        carMakes={carMakes}
                        carModels={carModels}
                    />
                )}
            </div>
        );
    }
}

HomePage.propTypes = {
    getCarsList: PropTypes.func.isRequired,
    getCategoriesList: PropTypes.func.isRequired,
    getMakesList: PropTypes.func.isRequired,
    getModelsList: PropTypes.func.isRequired,
    cars: PropTypes.shape({}).isRequired,
    categories: PropTypes.shape({}).isRequired,
    carMakes: PropTypes.shape({}).isRequired,
    carModels: PropTypes.shape({}).isRequired
};

const mapStateToProps = state => {
    const { cars, categories, carMakes, carModels } = state;
    return { cars, categories, carMakes, carModels };
};

export default connect(
    mapStateToProps,
    {
        getCarsList: carActions.getCarsList,
        getCategoriesList: carActions.getCategoriesList,
        getMakesList: carActions.getMakesList,
        getModelsList: carActions.getModelsList
    }
)(HomePage);
