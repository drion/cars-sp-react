import carConstants from "../_constants/car.constants";
import carService from "../_services/car.service";
import { getAllCarModels } from "../_reducers/";

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

function createCar(data) {
    function request() {
        return { type: carConstants.CREATE_CAR_REQUEST };
    }

    function success(payload) {
        return { type: carConstants.CREATE_CAR_SUCCESS, payload };
    }

    function failure(error) {
        return { type: carConstants.CREATE_CAR_FAILURE, error };
    }

    return dispatch => {
        dispatch(request());

        return carService
            .createCar(data)
            .then(
                payload => dispatch(success(payload.data)),
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

const sortModels = (order, orderBy) => (dispatch, getState) => {
    const state = getState();
    const allModels = getAllCarModels(state);
    // const searchFoundationsList = getSearchFoundations(state);
    // const searchText = getSearchText(state);

    dispatch({
        type: carConstants.SORT_MODELS,
        // list: searchText ? searchFoundationsList : allFoundations,
        list: allModels,
        order,
        text: "",
        orderBy
    });
};

const carActions = {
    getCarsList,
    createCar,
    getCategoriesList,
    getMakesList,
    getModelsList,
    sortModels
};

export default carActions;
