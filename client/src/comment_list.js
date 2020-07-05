import React from 'react';

function CommentList({ comments }) {
    console.log('comments are', comments);
    const renderComments = (comments || []).map((comment) => {
        let content = comment.content;
        if (comment.status === "pending") {
            content = "Comment is in moderation state";
        }

        if (comment.status === "rejected") {
            content = "Comment is rejected";
        }

        return (
            <li key={comment.id}>{content}</li>
        )
    })
    return (
        <ul>
            {renderComments}
        </ul>
    );
}

export default CommentList;
