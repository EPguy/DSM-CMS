import React, {useState, useEffect} from 'react';
import cookie from 'react-cookies';
import Club from '../../Images/club1.png';
import './PostWrite.css';
import axios from 'axios';
import {server} from '../../Server/api';

function PostView(props) {
    const [userData, setUserData] = useState({});
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    useEffect(() => {
        axios.get(`${server}/users/me`, {
            headers: {
                "X-Access-Token": localStorage.getItem('token')
            }
        }).then(response => {
            setUserData(response.data);
        }).catch(err => {
            console.log(err);
        })
    }, [])
    const onPost = () => {
        axios.post(`${server}/posts`, {
            title: title,
            content: content,
            type: props.type,
            club_name: userData.club
        }, {
            headers: {
                "X-Access-Token": localStorage.getItem('token')
            }
        })
        .then(response => {
            if(props.type==="ACHIEVEMENT") {
                window.location = `/clubinfo/${userData.club}`
            } else if(props.type==="RECRUITMENT") {
                window.location = `/recruit`
            } else if(props.type==="RESUME") {
                window.location = `/transerM`
            } else if(props.type==="NOTIFICATION") {
                window.location = `/adminpage`
            }
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
    }
    return (
        <div id="innerWrapper">
            <div id="post-wrapper">                
                <div id="post-contents-wrapper">
                    <input placeholder="제목" id="title" onChange={(e) => setTitle(e.target.value)}/>
                    <textarea placeholder="내용" id="content" onChange={(e) => setContent(e.target.value)}/>
                </div>
                <button onClick={onPost} id="postBtn">작성완료</button>
            </div>
            
        </div>
    );
}

export default PostView;