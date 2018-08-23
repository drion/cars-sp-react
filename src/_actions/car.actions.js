import carConstants from "../_constants/car.constants";
import carService from "../_services/car.service";

function getCarsList() {
    function request() {
        return { type: carConstants.GET_CARS_REQUEST };
    }

    function success(payload) {
        return { type: carConstants.GET_CARS_SUCCESS, payload };
    }

    function failure(error) {
        return { type: carConstants.GET_CARS_FAILURE, error };
    }

    return dispatch => {
        dispatch(request());

        return carService
            .getCars()
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error))
            );
    };
}

function getCategoriesList() {
    function request() {
        return { type: carConstants.GET_CATEGORIES_REQUEST };
    }

    function success(payload) {
        return { type: carConstants.GET_CATEGORIES_SUCCESS, payload };
    }

    function failure(error) {
        return { type: carConstants.GET_CATEGORIES_FAILURE, error };
    }

    return dispatch => {
        dispatch(request());

        return carService
            .getCategories()
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error))
            );
    };
}

function getMakesList() {
    function request() {
        return { type: carConstants.GET_CAR_MAKES_REQUEST };
    }

    function success(payload) {
        return { type: carConstants.GET_CAR_MAKES_SUCCESS, payload };
    }

    function failure(error) {
        return { type: carConstants.GET_CAR_MAKES_FAILURE, error };
    }

    return dispatch => {
        dispatch(request());

        return carService
            .getMakes()
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error))
            );
    };
}

function getModelsList() {
    function request() {
        return { type: carConstants.GET_CAR_MODELS_REQUEST };
    }

    function success(payload) {
        return { type: carConstants.GET_CAR_MODELS_SUCCESS, payload };
    }

    function failure(error) {
        return { type: carConstants.GET_CAR_MODELS_FAILURE, error };
    }

    return dispatch => {
        dispatch(request());

        return carService
            .getModels()
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error))
            );
    };
}

const carActions = {
    getCarsList,
    getCategoriesList,
    getMakesList,
    getModelsList
};

export default carActions;
