import { combineReducers } from "redux";

import userConstants from "../_constants/user.constants";
import carConstants from "../_constants/car.constants";

export const byId = (state = {}, action) => {
    switch (action.type) {
        case carConstants.GET_CAR_MAKES_SUCCESS: {
            const nextState = { ...state };
            action.payload.forEach(carMake => {
                nextState[carMake.uuid] = carMake;
            });

            return nextState;
        }

        case carConstants.CREATE_CAR_MAKES_SUCCESS: {
            const nextState = { ...state };
            const { carMake } = action;
            nextState[carMake.uuid] = carMake;

            return nextState;
        }

        case carConstants.DELETE_CAR_MAKES_SUCCESS: {
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
        case carConstants.GET_CAR_MAKES_SUCCESS:
            return sortList(action.payload, "asc", "owner").map(
                carMake => carMake.uuid
            );

        case carConstants.CREATE_CAR_MAKES_SUCCESS:
            return [action.carMake.uuid, ...state];

        case carConstants.SORT_CAR_MAKES:
            return action.text
                ? state
                : sortList(action.list, action.order, action.orderBy).map(
                      carMake => carMake.uuid
                  );

        case carConstants.DELETE_CAR_MAKES_SUCCESS:
            return state.filter(item => item !== action.id);

        case userConstants.LOGOUT:
            return [];

        default:
            return state;
    }
};

export const isLoading = (state = false, action) => {
    switch (action.type) {
        case carConstants.GET_CAR_MAKES_REQUEST:
            return true;
        case carConstants.GET_CAR_MAKES_SUCCESS:
        case carConstants.GET_CAR_MAKES_FAILURE:
        case userConstants.LOGOUT:
            return false;
        default:
            return state;
    }
};

const carMakes = combineReducers({
    isLoading,
    byId,
    allIds
});

export default carMakes;

export const getAllCarMakes = state => state.allIds.map(id => state.byId[id]);

export const retrieveCarMake = (state, uuid) => state.byId[uuid];

export const getCarMakesIsLoading = state => state.isLoading;

export const getCarMakesById = state => ({ ...state.byId });
