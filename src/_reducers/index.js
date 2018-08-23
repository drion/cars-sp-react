import { combineReducers } from "redux";

import authentication from "./authentication.reducer";
import user from "./user.reducer";

import cars, * as fromCars from "./car.reducer";
import categories, * as fromCategories from "./categories.reducer";
import carMakes, * as fromCarMakes from "./make.reducer";
import carModels, * as fromCarModels from "./model.reducer";

const rootReducer = combineReducers({
    authentication,
    user,
    cars,
    categories,
    carMakes,
    carModels
});

export default rootReducer;

// Cars selectors
export const getAllCars = state => fromCars.getAllCars(state.cars);

export const retrieveCar = (state, uuid) =>
    fromCars.retrieveCar(state.cars, uuid);

export const getCarsIsLoading = state => fromCars.getCarsIsLoading(state.cars);

// Categories selectors
export const getAllCategories = state =>
    fromCategories.getAllCategories(state.categories);

export const retrieveCategory = (state, uuid) =>
    fromCategories.retrieveCategory(state.categories, uuid);

export const getCategoriesIsLoading = state =>
    getCategoriesIsLoading(state.categories);

// CarMakes selectors
export const getAllCarMakes = state =>
    fromCarMakes.getAllCarMakes(state.carMakes);

export const retrieveCarMake = (state, uuid) =>
    fromCarMakes.retrieveCarMake(state.carMakes, uuid);

export const getCarMakesIsLoading = state =>
    fromCarMakes.getCarMakesIsLoading(state.carMakes);

// CarModels selectors
export const getAllCarModels = state =>
    fromCarModels.getAllCarModels(state.carModels);

export const retrieveCarModel = (state, uuid) =>
    fromCarModels.retrieveCarModel(state.carModels, uuid);

export const getCarModelsIsLoading = state =>
    fromCarModels.getCarModelsIsLoading(state.carModels);
