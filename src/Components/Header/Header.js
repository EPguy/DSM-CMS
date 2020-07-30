import React, {useEffect,useState} from 'react';
import Notice from '../../Images/notice.png';
import cookie from 'react-cookies';
import Club from '../../Images/club1.png';
import Marquee from "react-smooth-marquee"
import { Link } from 'react-router-dom';
import './Header.css';
import {server} from '../../Server/api';
import axios from 'axios';

function Header() {
    const [isLogin, setIsLogin] = useState(true);   
    const [userData, setUserData] = useState({});
    const [userClub, setUserClub] = useState({});
    const [notification, setNotification] = useState([]);
    const [club, setClub] = useState([]);
    useEffect(() => {
        axios.get(`${server}/users/me`, {
            headers: {
                "X-Access-Token": localStorage.getItem('token')
            }
        }).then(response => {
            setIsLogin(true)
            setUserData(response.data);
        }).catch(err => {
            setIsLogin(false)
            console.log(err);
        })
        axios.get(`${server}/clubs`)
        .then(response => setClub(response.data))
        .catch(err => console.log(err))
        axios.get(`${server}/posts?type=NOTIFICATION`)
        .then(response => {
            setNotification(response.data)
        })
        .catch(err => console.log(err))
    }, [])
    const linkToMyPage = {
        pathname: `/mypage/`,
        state: {
            userData: userData
        }
    }
    const linkToClubAdmin = {
        pathname: `/clubadmin/`,
        state: {
            userData: userData
        }
    }
    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }
    const adminClick = () => {
        axios.get(`${server}/clubs/${userData.club}`)
        .then(response => 
            {
                if(response.data.leader.split('-')[0] !== userData.studentNumber) {
                    alert('권한이 없습니다.')
                    window.location.href = "/";
                }
            })
        .catch(err => console.log(err))
    }
    const noticeClick = () => {
        if(userData.role !== "ROLE_ADMIN") {
            alert('권한이 없습니다.')
            window.location.href = "/";
        }
    }
    return (
        <div id="header">
            <div id="headerHead">
                {userData.club === null ? <Link to={`/`}><span>CMS</span></Link> : <Link to={`/clubinfo/${userData.club}`}><span>CMS</span></Link>}
                <div id="userInfo">
                    {isLogin ?
                        
                        <div class="login-wrapper">
                            <Link to={linkToMyPage}><p class="user-name">{userData.name}</p></Link>
                            <p onClick={logout} style={{float:"right"}} id="registBtn">로그아웃</p> 
                        </div> : <Link to="/login">로그인</Link>} 
                </div>
            </div>
            <div id="menu">
                <ul>
                    {userData.club === null ? <li><Link to={`/`}>동아리홈</Link></li> : <li><Link to={`/clubinfo/${userData.club}`}>동아리홈</Link></li>}
                    <li><Link to="/recruit">모집공고게시판</Link></li>
                    <li><Link to="/transerM">이적시장</Link></li>
                    <li><Link to={linkToClubAdmin} onClick={adminClick}>동아리관리</Link></li>
                    <li><a href="/adminpage" onClick={noticeClick}>공지사항</a></li>
                </ul>
            </div>
            <div id="noticebar">
                <Marquee  scrolldelay="100" behavior="scroll">
                {
                    notification.map((item, index) => {
                        return (
                            <li key={index}>{item.title}</li>
                        )
                    })
                }
                </Marquee>
            </div>
            <div id="clubList">
                {
                    club.map((item, index) => {
                        console.log(item)   
                        return (
                            <li className="club-logo" key={index}><a href={`/clubinfo/${item.club_name}`}><img src={item.logo} alt=""/></a></li>
                        )
                    })
                }
                

            </div>
        </div>
    );
}

export default Header;