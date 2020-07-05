const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const app = express();
const axios = require('axios');
const postCollection = {};
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.post('/api/posts/create', async (req, res) => {
    console.log('api/post is hit');
    const { title } = req.body;
    const id = randomBytes(4).toString('hex');
    postCollection[id] = {
        id, title
    }
    await axios.post('http://event-bus-srv:5005/api/events', {
        type: "PostCreated",
        data: {
            id, title
        }
    });
    res.status(200).send(postCollection[id]);
});

app.post('/api/events',  (req, res) => {
    console.log('Received Event', req.body.type);
    res.send({});
});

app.get('/api/posts', (req, res) => {
    res.send(postCollection);
  });
  

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason.stack || reason)
})

app.listen(5000, () => {
    console.log('listening on port 5000');
})
