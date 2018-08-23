import { combineReducers } from "redux";

import userConstants from "../_constants/user.constants";
import carConstants from "../_constants/car.constants";

export const byId = (state = {}, action) => {
    switch (action.type) {
        case carConstants.GET_CAR_MODELS_SUCCESS: {
            const nextState = { ...state };
            action.payload.forEach(carModel => {
                nextState[carModel.uuid] = carModel;
            });

            return nextState;
        }

        case carConstants.CREATE_CAR_MODELS_SUCCESS: {
            const nextState = { ...state };
            const { carModel } = action;
            nextState[carModel.uuid] = carModel;

            return nextState;
        }

        case carConstants.DELETE_CAR_MODELS_SUCCESS: {
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
        case carConstants.GET_CAR_MODELS_SUCCESS:
            return sortList(action.payload, "asc", "owner").map(
                carModel => carModel.uuid
            );

        case carConstants.CREATE_CAR_MODELS_SUCCESS:
            return [action.carModel.uuid, ...state];

        case carConstants.SORT_MODELS:
            return action.text
                ? state
                : sortList(action.list, action.order, action.orderBy).map(
                      carModel => carModel.uuid
                  );

        case carConstants.DELETE_CAR_MODELS_SUCCESS:
            return state.filter(item => item !== action.id);

        case userConstants.LOGOUT:
            return [];

        default:
            return state;
    }
};

export const isLoading = (state = false, action) => {
    switch (action.type) {
        case carConstants.GET_CAR_MODELS_REQUEST:
            return true;
        case carConstants.GET_CAR_MODELS_SUCCESS:
        case carConstants.GET_CAR_MODELS_FAILURE:
        case userConstants.LOGOUT:
            return false;
        default:
            return state;
    }
};

const carModels = combineReducers({
    isLoading,
    byId,
    allIds
});

export default carModels;

export const getAllCarModels = state => state.allIds.map(id => state.byId[id]);

export const retrieveCarModel = (state, uuid) => state.byId[uuid];

export const getCarModelsIsLoading = state => state.isLoading;
