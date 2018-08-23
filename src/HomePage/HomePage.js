import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

import { connect } from "react-redux";

import CarTable from "./CarTable";
import CreateDialog from "./CreateDialog";
import carActions from "../_actions/car.actions";

import "../_styles/HomePage.scss";

class HomePage extends React.Component {
    state = {
        open: false
    };

    componentDidMount() {
        this.props.getCarsList();
        this.props.getCategoriesList();
        this.props.getMakesList();
        this.props.getModelsList();
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleCreate = data => this.props.createCar(data);

    render() {
        const { open } = this.state;
        const {
            cars,
            categories,
            carMakes,
            carModels,
            sortModels
        } = this.props;

        const isLoading =
            cars.isLoading ||
            categories.isLoading ||
            carMakes.isLoading ||
            carModels.isLoading;

        return (
            <div className="home-page">
                {!isLoading && (
                    <div className="content">
                        <div className="buttonContainer">
                            <Button
                                onClick={this.handleClickOpen}
                                className="addNewCar"
                            >
                                Add new car
                            </Button>
                        </div>
                        <CarTable
                            cars={cars}
                            categories={categories}
                            carMakes={carMakes}
                            carModels={carModels}
                            sortModels={sortModels}
                        />
                        <CreateDialog
                            open={open}
                            handleClose={this.handleClose}
                            handleCreate={data => this.handleCreate(data)}
                        />
                    </div>
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
    sortModels: PropTypes.func.isRequired,
    createCar: PropTypes.func.isRequired,
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
        getModelsList: carActions.getModelsList,
        sortModels: carActions.sortModels,
        createCar: carActions.createCar
    }
)(HomePage);
