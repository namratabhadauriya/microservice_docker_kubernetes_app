import React from 'react';
import PostCreate from './post_create';
import PostList from './post_list';

function App() {
  return (
    <div className="container">Blog APP
      <h1>Create Post</h1>
      <PostCreate />
      <h1>Posts</h1>
      <PostList />
    </div>
  );
}

export default App;
