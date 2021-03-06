import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";

import { connect } from "react-redux";

import CarTable from "./CarTable";
import CreateDialog from "./CreateDialog";
import CustomYearPicker from "./CustomYearPicker";
import carActions from "../_actions/car.actions";

import "../_styles/HomePage.scss";

class HomePage extends React.Component {
    state = {
        open: false,
        startYear: "",
        endYear: ""
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

    handleStartFilter = year => {
        this.props.setFilterStartYear(year);
        this.setState({ startYear: year === null ? "" : String(year) });
    };

    handleEndFilter = year => {
        this.props.setFilterEndYear(year);
        this.setState({ endYear: year === null ? "" : String(year) });
    };

    render() {
        const { open } = this.state;
        const { cars, categories, carMakes, carModels, sortCars } = this.props;

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
                            <div className="filter">
                                <CustomYearPicker
                                    id="startYear"
                                    onChange={this.handleStartFilter}
                                    value={this.state.startYear}
                                    name="startYear"
                                />
                                -
                                <CustomYearPicker
                                    id="endYear"
                                    onChange={this.handleEndFilter}
                                    value={this.state.endYear}
                                    name="endYear"
                                />
                            </div>
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
                            sortCars={sortCars}
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
    sortCars: PropTypes.func.isRequired,
    createCar: PropTypes.func.isRequired,
    setFilterStartYear: PropTypes.func.isRequired,
    setFilterEndYear: PropTypes.func.isRequired,
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
        sortCars: carActions.sortCars,
        createCar: carActions.createCar,
        setFilterStartYear: carActions.setFilterStartYear,
        setFilterEndYear: carActions.setFilterEndYear
    }
)(HomePage);
