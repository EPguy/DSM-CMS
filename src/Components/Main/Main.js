import React, {useEffect} from 'react';
import Header from '../Header/Header';
import Club from '../../Images/club1.png';
import Notice from '../../Images/notice.png';
import Left from '../../Images/btn-left.png';
import Right from '../../Images/btn-right.png';
import './Main.css';
import axios from 'axios';
import {server} from '../../Server/api';

const PostLogin = () => {
    axios.post(`${server}/auth/login`, {
        id: "h-williams",
        password: "test"
    }).then(response => {
        console.log(response)
    }).catch(err => {
        console.log(err)
    })
}
function Main() {
    return (
        <React.Fragment>
            <div id="innerWrapper">
                
                <div id="clubInfoWrapper">
                    
                </div>
            </div>
        </React.Fragment>
    );
}

export default Main;