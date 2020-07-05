import React, { useState } from 'react';
import axios from 'axios';

function CommentCreate({ postId }) {
    const [content, setComment] = useState('');
    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://posts.com/api/posts/${postId}/comments`, {
            content
        });
        setComment('');
    }
    return (
        <form className="form-group" onSubmit={onSubmit}>
            <label>New comment</label>
            <input type="text" className="form-control" value={content} onChange={e => setComment(e.target.value)} />
            <button className="btn btn-primary">Submit</button>
        </form>
    );
}

export default CommentCreate;
