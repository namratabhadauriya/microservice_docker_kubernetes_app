import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './comment_create';
import CommentList from './comment_list'

function PostList() {
    const [posts, setPosts] = useState({});

    const onFetchPosts = async () => {
        const res = await axios.get('http://posts.com/api/posts');
        setPosts(res.data);
    }

    useEffect(() => {
        onFetchPosts();
    }, []);

    const renderPosts = Object.values(posts).map((post) => {
        return (
            <div className="card"
                style={{ padding: "10px", marginBottom: "20px" }}
                key={post.id}>
                <div className="card-boyd">
                    <h3>{post.title}</h3>
                    <CommentList comments={post.comments} />
                    <CommentCreate postId={post.id} />
                </div>
            </div>
        )
    })
    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderPosts}
        </div>
    );
}

export default PostList;
