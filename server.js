require('dotenv').config();
const cors = require('cors');

const express = require('express');
const axios = require('axios');

const app = express();
app.use(cors());
const port = 5001;

const API_KEY = process.env.API_KEY;
const WHOIS_API_URL = 'https://www.whoisxmlapi.com/whoisserver/WhoisService';

app.get('/api/whois', async (req, res) => {
    const { domainName } = req.query;

    if (!domainName) {
        return res.status(400).json({ error: 'Domain is required' });
    }

    try {
        const response = await axios.get(WHOIS_API_URL, {
            params: {
                apiKey: API_KEY,
                domainName,
                outputFormat: "JSON"
            }
        });
        
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch WHOIS data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});