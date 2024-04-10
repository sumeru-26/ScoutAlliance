import express from 'express';

const entriesRoute = express.Router();

const API_URL = "http://127.0.0.1:8000";

async function getEntries(team) {
    const query = new URLSearchParams();
    query.append('query', {});
    try {
        const response = await fetch(`${API_URL}/${team}/entries/get` + query, {
            method: 'GET'
        })
        const entries = await response.json();
        return entries;
    }
    catch (error) {
        console.log(error);
    }
}

entriesRoute.get('/', (req, res) => {
    res.send(JSON.stringify(getEntries(9999)));
});

export default entriesRoute;