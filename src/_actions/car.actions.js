import carConstants from "../_constants/car.constants";
import carService from "../_services/car.service";
import {
    getFilterEndYear,
    getFilterStartYear,
    getAllCars,
    getCarModelsById,
    getCarMakesById,
    getCategoriesById
} from "../_reducers/";

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

const sortCars = (order, orderBy) => (dispatch, getState) => {
    const state = getState();
    const allCars = getAllCars(state);
    const modelsById = getCarModelsById(state);
    const makesById = getCarMakesById(state);
    const categoriesById = getCategoriesById(state);

    dispatch({
        type: carConstants.SORT_CARS,
        order,
        orderBy,
        allCars,
        modelsById,
        makesById,
        categoriesById
    });
};

const setFilterStartYear = year => (dispatch, getState) => {
    const state = getState();
    const endYear = getFilterEndYear(state);
    const allCars = getAllCars(state);
    const date = year === null ? carConstants.MIN_YEAR : year;

    dispatch({
        type: carConstants.SET_START_YEAR,
        year: date
    });

    dispatch({
        type: carConstants.FILTER_BY_YEAR,
        start: date,
        end: endYear,
        allCars
    });
};

const setFilterEndYear = year => (dispatch, getState) => {
    const state = getState();
    const startYear = getFilterStartYear(state);
    const allCars = getAllCars(state);
    const date = year === null ? carConstants.MAX_YEAR : year;

    dispatch({
        type: carConstants.SET_END_YEAR,
        year: date
    });

    dispatch({
        type: carConstants.FILTER_BY_YEAR,
        start: startYear,
        end: date,
        allCars
    });
};

const carActions = {
    getCarsList,
    createCar,
    getCategoriesList,
    getMakesList,
    getModelsList,
    sortCars,
    setFilterStartYear,
    setFilterEndYear
};

export default carActions;
