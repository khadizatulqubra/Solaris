const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch-commonjs');

const app = express();
app.use(cors());

app.get('/bodies', async (req, res) => {
    try {
        const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies', {
            method: 'GET',
            headers: { 'x-zocom': 'solaris-edVCa1E6zDZRztaq' }
        });
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).send('Error fetching data');
    }
});

app.listen(3000, () => {
    console.log('Proxy running on http://localhost:3000');
});
