import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Club from '../../Images/club1.png';
import Notice from '../../Images/notice.png';
import Left from '../../Images/btn-left.png';
import Right from '../../Images/btn-right.png';
import cookie from 'react-cookies';
import Crown from '../../Images/crown.png';
import {Link} from 'react-router-dom';
import './ClubInfo.css';
import axios from 'axios';
import {server} from '../../Server/api';
import * as moment from 'moment'

function ClubInfo(props) {
    const [club, setClub] = useState({
        members: [
            ""
        ]
    });
    const [clubPost, setClubPost] = useState([]);
    useEffect(() => {
        axios.get(`${server}/clubs/${props.clubname}`)
        .then(response => 
            {
                console.log(response.data)
                setClub(response.data)
            })
        .catch(err => console.log(err))
        axios.get(`${server}/posts`, {
            params: {
                type: "ACHIEVEMENT",
                club: props.clubname
            }
        })
        .then(response => {
            console.log("ss : " + response.data)
            setClubPost(response.data)
        })
        .catch(err => console.log(err))
    }, [])
    const onApply = () => {
        axios.post(`${server}/applications`, {
            club_name: props.clubname
        }, {headers: {
            "X-Access-Token": localStorage.getItem('token')
        }})
        .then(response => {
            alert('신청완료')
        })
        .catch(err => {
            alert(err)
        })
    }
    const click = (id) => {
        window.location.href = `/posts/${id}`
    }
    return (
        <React.Fragment>
            <div id="innerWrapper">
                
                <div id="clubInfoWrapper">
                    <div id="clubInfo">
                        <div id="clubNameWrapper">
                            <img src={club.logo} alt=""/>
                            <div style={{float: "right", width: "88%", height: "100px", border: "solid 1px #e6e6e6;"}}>
                                <div id="clubName">{club.club_name}</div>
                                <div style={{padding: "5px"}}>{club.introduce}</div>
                            </div>
                            <p  onClick={onApply} id="registBtn">동아리 신청</p> 
                        </div>
                        <p>동아리원</p>
                        <div id="memberWrapper">
                            <div id="itemWrapper">
                                {
                                    club.members.map((item,index) => {
                                        return (
                                            <div class="memberItem">
                                                {
                                                    club.leader === item ? <div>부장</div> : <div>부원</div>
                                                }
                                                {item}
                                            </div>
                                        )
                                    })
                                }
                                
                            </div>
                            <a class="prev"><img src={Left} alt=""/></a>
                            <a class="next"><img src={Right} alt=""/></a>
                        </div>
                    
                        <div>
                            <div class="club-info-top">
                                <p>성과 게시판</p>
                                <Link to="/postwrite"><p style={{float:"right"}} id="registBtn">등록하기</p></Link>
                            </div>
                            <table>
                                <tr>
                                    <td>No</td>
                                    <td>제목</td>
                                    <td>작성자</td>
                                    <td>날짜</td>
                                </tr>
                                {
                                    clubPost.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td onClick={() => click(item.post_id)}>{item.post_id}</td>
                                                <td onClick={() => click(item.post_id)}>{item.title}</td>
                                                <td onClick={() => click(item.post_id)}>{item.writer}</td>
                                                <td onClick={() => click(item.post_id)}>{moment(item.date_time).format('YYYY/MM/DD')}</td>
                                            </tr>
                                        )
                                    })
                                }
                                
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ClubInfo;