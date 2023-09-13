import axios from "axios";

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common["x-api-key"] = "live_9kiDHMhFdeE2rfOLl2wgxZw7fwsk4seOO7CsMmYTzK6Coa1hO3QsqlLKs8jfnlu6";

export function fetchBreeds() {
    return axios.get('breeds')
        .then(res => res.data)
        .catch(error => {
            throw new Error("The request failed:", error);
        });
};

export function fetchCatByBreed(breedId) {

    return axios.get(`images/search?breed_ids=${breedId}`)
        .then(res => res.data)
        .catch(error => {
            throw new Error("The request failed:", error);
        });
};
