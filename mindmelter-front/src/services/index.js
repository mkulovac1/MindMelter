import axios from "axios";

export const BASE_URL = 'http://localhost:5116/';

export const ENDPOINTS = {
    participant: 'Participant',
    question: 'Question'
}

export const createAPIEndpoint = endpoint => {
    let url = BASE_URL + 'api/' + endpoint;

    return {
        fetch: () => axios.get(url),
        fetchById: id => axios.get(url + id),
        post: newRecord => axios.post(url, newRecord),
        put: (id, updateRecord) => axios.put(url + id, updateRecord),
        delete: id => axios.delete(url + id)
    }
}