import React, { useState } from 'react';
import axios from 'axios';

function PostCreate() {
    const [title, setTitle] = useState('');
    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://posts.com/api/posts/create', {
            title
        });
        setTitle('');
    }
    return (
        <form className="form-group" onSubmit={onSubmit}>
            <label>Title</label>
            <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
            <button className="btn btn-primary">Submit</button>
        </form>
    );
}

export default PostCreate;
