import React, {useState, useEffect} from 'react';
import cookie from 'react-cookies';
import Club from '../../Images/club1.png';
import queryString from 'query-string';
import './PostView.css';
import {server} from '../../Server/api';
import axios from 'axios';

function PostView(props) {
    const [post, setPost] = useState({});
    const [comment, setComment] = useState([]);
    const [inputComment, setInputComment] = useState('');
    console.log(props)
    useEffect(() => {
        axios.get(`${server}/posts/${props.postid}`)
        .then(response => setPost(response.data))
        .catch(err => console.log(err))
        axios.get(`${server}/comments`, {
            params: {
                post_id : props.postid
            }
        })
        .then(response => setComment(response.data))
        .catch(err => console.log(err))
    }, [])
    const onPost = () => {
        axios.post(`${server}/comments`, {
            content: inputComment,
            post_id: props.postid,
        }, {
            headers: {
                "X-Access-Token": localStorage.getItem('token')
            }
        })
        .then(response => {
            window.location = `/posts/${props.postid}`
        })
        .catch(err => {
            console.log(err)
        })
    }
    const onDelete = () => {
        axios.delete(`${server}/posts/${props.postid}`, {
            headers: {
                "X-Access-Token": localStorage.getItem('token')
            }
        })
        .then(response => {
            alert('삭제되었습니다.')
            window.location = `/`
        })
        .catch(err => {
            alert('권한이 없습니다.');
            console.log(err)
        })
    }
    return (
        <div id="innerWrapper">
            <div id="post-wrapper">                
                <div id="post-contents-wrapper">
                    <div id="title">
                        <h3>{post.title}</h3>
                        <button onClick={onDelete} id="postBtn">삭제</button>
                    </div>
                    <div id="content">{post.content}</div>
                </div>
                <div id="comment-wrapper">
                    <div id="comment-top">댓글</div>
                    <div class="comment-input-wrapper">
                        <input onChange={(e) => setInputComment(e.target.value)} placeholder="댓글입력" id="title"/>
                        <button onClick={onPost} id="postBtn">작성</button>
                    </div>
                    {
                        comment.map((item, index) => {
                            return (
                                <div id="comment-item">
                                    {item.content}
                                    <div id="comment-writer">{item.writer}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            
        </div>
    );
}

export default PostView;