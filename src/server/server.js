import { PROBLEM_OCCURED } from "../constants/messages";
import axios from "axios";

export const COUNTRIES_URL = "https://laravel-world.com/api/countries";
export const QUOTES_URL = "https://dummyjson.com/quotes/random";

export const getCountriesData = (setCountriesData) => {
  axios.get(COUNTRIES_URL).then((res) => {
    let countries = [];
    res.data.data.map((objData) => {
      countries.push(objData.name);
    });
    setCountriesData(countries);
  });
};

export const getQuoteData = () => {
  return axios
    .get(QUOTES_URL)
    .then((res) => res.data.quote)
    .catch(() => PROBLEM_OCCURED);
};
