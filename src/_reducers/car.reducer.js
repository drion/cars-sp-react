import { combineReducers } from "redux";

import userConstants from "../_constants/user.constants";
import carConstants from "../_constants/car.constants";

export const byId = (state = {}, action) => {
    switch (action.type) {
        case carConstants.GET_CARS_SUCCESS: {
            const nextState = { ...state };
            action.payload.forEach(car => {
                nextState[car.uuid] = car;
            });

            return nextState;
        }

        case carConstants.CREATE_CAR_SUCCESS: {
            const nextState = { ...state };
            const { payload } = action;
            nextState[payload.uuid] = payload;

            return nextState;
        }

        case carConstants.DELETE_CAR_SUCCESS: {
            const nextState = { ...state };
            delete nextState[action.id];
            return nextState;
        }

        case userConstants.LOGOUT:
            return {};

        default:
            return state;
    }
};

const sortList = (list, order, orderBy) => {
    let sortedList = [...list];
    if (order === "asc")
        sortedList = list.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
    else if (order === "desc")
        sortedList = list.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1));
    return sortedList;
};

export const allIds = (state = [], action) => {
    switch (action.type) {
        case carConstants.GET_CARS_SUCCESS:
            return sortList(action.payload, "asc", "owner").map(
                car => car.uuid
            );

        case carConstants.CREATE_CAR_SUCCESS:
            return [action.payload.uuid, ...state];

        case carConstants.SORT_CARS:
            return action.text
                ? state
                : sortList(action.list, action.order, action.orderBy).map(
                      car => car.uuid
                  );

        case carConstants.DELETE_CAR_SUCCESS:
            return state.filter(item => item !== action.id);

        case userConstants.LOGOUT:
            return [];

        default:
            return state;
    }
};

export const isLoading = (state = false, action) => {
    switch (action.type) {
        case carConstants.GET_CARS_REQUEST:
            return true;
        case carConstants.GET_CARS_SUCCESS:
        case carConstants.GET_CARS_FAILURE:
        case userConstants.LOGOUT:
            return false;
        default:
            return state;
    }
};

export const filterStartYear = (state = carConstants.MIN_YEAR, action) => {
    switch (action.type) {
        case carConstants.SET_START_YEAR:
            return action.year;
        case carConstants.GET_CARS_SUCCESS:
        case carConstants.GET_CARS_FAILURE:
        case userConstants.LOGOUT:
            return carConstants.MIN_YEAR;
        default:
            return state;
    }
};

export const filterEndYear = (state = carConstants.MAX_YEAR, action) => {
    switch (action.type) {
        case carConstants.SET_END_YEAR:
            return action.year;
        case carConstants.GET_CARS_SUCCESS:
        case carConstants.GET_CARS_FAILURE:
        case userConstants.LOGOUT:
            return carConstants.MAX_YEAR;
        default:
            return state;
    }
};

export const filteredIds = (state = [], action) => {
    switch (action.type) {
        case carConstants.FILTER_BY_YEAR:
            return action.allCars
                .filter(
                    car => action.start <= car.year && car.year <= action.end
                )
                .map(car => car.uuid);
        case carConstants.GET_CARS_SUCCESS:
        case carConstants.GET_CARS_FAILURE:
        case userConstants.LOGOUT:
            return [];
        default:
            return state;
    }
};

const cars = combineReducers({
    isLoading,
    byId,
    allIds,
    filterStartYear,
    filterEndYear,
    filteredIds
});

export default cars;

export const getAllCars = state => state.allIds.map(id => state.byId[id]);

export const getAllOrFilterdCars = state => {
    if (
        state.filterStartYear === carConstants.MIN_YEAR &&
        state.filterEndYear === carConstants.MAX_YEAR
    )
        return state.allIds.map(id => state.byId[id]);
    return state.filteredIds.map(id => state.byId[id]);
};

export const retrieveCar = (state, uuid) => state.byId[uuid];

export const getCarsIsLoading = state => state.isLoading;

export const getFilterStartYear = state => state.filterStartYear;

export const getFilterEndYear = state => state.filterEndYear;
