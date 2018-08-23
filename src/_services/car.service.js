import axios from "axios";

const handleResponse = response =>
    response.status === 200
        ? response.data
        : Promise.reject(response.statusText);

const getCars = () => axios.get("/cars/").then(handleResponse);

const getCategories = () => axios.get("/cars/categories/").then(handleResponse);

const getMakes = () => axios.get("/cars/makes/").then(handleResponse);

const getModels = () => axios.get("/cars/models/").then(handleResponse);

const carService = {
    getCars,
    getCategories,
    getMakes,
    getModels
};

export default carService;
