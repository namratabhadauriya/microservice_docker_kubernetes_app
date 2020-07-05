const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const posts = {};

app.post('/api/events', async (req, res) => {
    console.log('query api is hit');
    const { type, data } = req.body;
    if (type === "PostCreated") {
        const { id, title } = data;
        posts[id] = {
            id, title, comments: []
        }

    }
    if (type === "CommentCreated") {
        const { id, content, postId, status } = data;
        posts[postId].comments.push({
            id, content, status
        });
    }

    if (type === 'CommentModerated') {
        const { postId, id, status, content } = data;
        const post = posts[postId];

        const comment = post.comments.find(comment => {
            return comment.id === id;
        });
        comment.status = status;
        comment.content = content;
    }
    console.log(posts);
    res.send(posts);
});

app.get('/api/posts', (req, res) => {
    console.log('query api is hit')
    res.send(posts);
});

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason.stack || reason)
})

app.listen(5002, () => {
    console.log('listening on port 5002');
})
