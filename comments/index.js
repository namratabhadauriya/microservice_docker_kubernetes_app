const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const app = express();
const commentsByPostId = {};
const axios = require('axios');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.post('/api/posts/:id/comments', async (req, res) => {
    console.log('comment api is hit');
    const { content } = req.body;
    const id = req.params.id;
    const commentId = randomBytes(4).toString('hex');
    const comments = commentsByPostId[id] || [];
    console.log(comments);
    const comment = {
        commentId,
        content
    }
    comments.push(comment);
    await axios.post('http://event-bus-srv:5005/api/events', {
        type: "CommentCreated",
        data: {
            id: commentId, content, postId: id, status: 'pending'
        }
    });
    commentsByPostId[id] = comments
    res.status(200).send(comments);
});

app.post('/api/events', async (req, res) => {
    console.log('Event Received:', req.body.type);

    const { type, data } = req.body;

    if (type === 'CommentModerated') {
        const { postId, id, status, content } = data;
        const comments = commentsByPostId[postId];

        const comment = comments.find(comment => {
            return comment.id === id;
        });
        comment.status = status;
        console.log('status is', status);
        await axios.post('http://event-bus-srv:5005', {
            type: 'CommentUpdated',
            data: {
                id,
                status,
                postId,
                content
            }
        });
    }

    res.send({});
});

app.get('/api/posts/:id/comments', (req, res) => {
    console.log(req.params.id);
    res.send(commentsByPostId[req.params.id]);
});

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason.stack || reason)
})

app.listen(5001, () => {
    console.log('listening on port 5001');
})
