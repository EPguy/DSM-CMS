import React, {useState} from 'react';
import Header from '../Header/Header';
import cookie from 'react-cookies';
import Club from '../../Images/club1.png';
import './Login.css';
import axios from 'axios';
import {server} from '../../Server/api';

function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const PostLogin = () => {
        console.log(login, password);
        axios.post(`${server}/auth/login`, {
            id: login,
            password: password
        }).then(response => {
            localStorage.setItem('token', response.data.accessToken);
            window.location.href = "/";
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div id="innerWrapper">
            <div class="wrapper">
                <div id="formContent">
                    <div style={{fontSize:'25px', marginBottom: '5px;'}} class="fadeIn first">
                        CMS
                    </div>
                    <input type="text" id="ID" onChange={(e) => setLogin(e.target.value)} class="fadeIn second" name="login" placeholder="아이디"/>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} id="password" class="fadeIn third" name="login" placeholder="패스워드"/>
                    <input onClick={PostLogin} type="submit" class="fadeIn fourth" value="Sign In"/>
                    <div id="formFooter">
                    {/*<a style={{color: "black"}} class="underlineHover fadeIn fourth" href="register.html">아이디가 없으신가요?</a>*/}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;