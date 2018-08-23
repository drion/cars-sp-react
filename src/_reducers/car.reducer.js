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

const cars = combineReducers({
    isLoading,
    byId,
    allIds
});

export default cars;

export const getAllCars = state => state.allIds.map(id => state.byId[id]);

export const retrieveCar = (state, uuid) => state.byId[uuid];

export const getCarsIsLoading = state => state.isLoading;
