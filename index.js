require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;
const MAX_REQUESTS_PER_SECOND = process.env.MAX_REQUESTS_PER_SECOND || 50;

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let requestsCount = 0;
setInterval(() => {
    requestsCount = 0;
}, 1000);

app.use(express.json());

app.post('/api', async (req, res) => {
    requestsCount++;
    if (requestsCount > MAX_REQUESTS_PER_SECOND) {
        return res.status(429).send('Too Many Requests');
    }

    const delayTime = Math.floor(Math.random() * 1000) + 1;
    await delay(delayTime);

    res.json({ index: req.body.index });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
