import { combineReducers } from "redux";

import userConstants from "../_constants/user.constants";
import carConstants from "../_constants/car.constants";

export const byId = (state = {}, action) => {
    switch (action.type) {
        case carConstants.GET_CATEGORIES_SUCCESS: {
            const nextState = { ...state };
            action.payload.forEach(category => {
                nextState[category.uuid] = category;
            });

            return nextState;
        }

        case carConstants.CREATE_CATEGORIES_SUCCESS: {
            const nextState = { ...state };
            const { category } = action;
            nextState[category.uuid] = category;

            return nextState;
        }

        case carConstants.DELETE_CATEGORIES_SUCCESS: {
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
        case carConstants.GET_CATEGORIES_SUCCESS:
            return sortList(action.payload, "asc", "owner").map(
                category => category.uuid
            );

        case carConstants.CREATE_CATEGORIES_SUCCESS:
            return [action.category.uuid, ...state];

        case carConstants.SORT_CATEGORIES:
            return action.text
                ? state
                : sortList(action.list, action.order, action.orderBy).map(
                      category => category.uuid
                  );

        case carConstants.DELETE_CATEGORIES_SUCCESS:
            return state.filter(item => item !== action.id);

        case userConstants.LOGOUT:
            return [];

        default:
            return state;
    }
};

export const isLoading = (state = false, action) => {
    switch (action.type) {
        case carConstants.GET_CATEGORIES_REQUEST:
            return true;
        case carConstants.GET_CATEGORIES_SUCCESS:
        case carConstants.GET_CATEGORIES_FAILURE:
        case userConstants.LOGOUT:
            return false;
        default:
            return state;
    }
};

const categories = combineReducers({
    isLoading,
    byId,
    allIds
});

export default categories;

export const getAllCategories = state => state.allIds.map(id => state.byId[id]);

export const retrieveCategory = (state, uuid) => state.byId[uuid];

export const getCategoriesIsLoading = state => state.isLoading;
