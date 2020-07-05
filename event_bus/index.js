const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.post('/api/events', async (req, res) => {
    const event = req.body;
    axios.post('http://posts-srv:5000/api/events', event);
    axios.post('http://comments-srv:5001/api/events', event);
    axios.post('http://query-srv:5002/api/events', event);
    axios.post('http://moderator-srv:5003/api/events', event);
    res.send({ status: 'OK' });
});

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason.stack || reason)
})

app.listen(5005, () => {
    console.log('listening on port 5005');
})
