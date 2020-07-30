import React from 'react';
import PostView from '../Components/PostView/PostView';

function PostViewPage({match}) {
    return(
        <>
            <PostView postid={match.params.postid}/>
        </>
    )
};

export default PostViewPage;