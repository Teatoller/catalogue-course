import { handleResponse, handleError } from "./apiUtils";
// const baseUrl = process.env.API_URL + "/authors/";
const baseUrl = process.env.REACT_APP_CATALOGUE_BASE_URL + "/authors/";

export function getAuthors() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
