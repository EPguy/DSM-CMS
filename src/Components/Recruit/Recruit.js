import React, {useEffect, useState} from 'react';
import Header from '../Header/Header';
import Club from '../../Images/club1.png';
import Notice from '../../Images/notice.png';
import Left from '../../Images/btn-left.png';
import Right from '../../Images/btn-right.png';
import './Recruit.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {server} from '../../Server/api';
import * as moment from 'moment'

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
function Recruit() {
    const click = (id) => {
        window.location.href = `/posts/${id}`
    }
    const [recurit, setRecurit] = useState([]);
    useEffect(() => {
        axios.get(`${server}/posts?type=RECRUITMENT`)
        .then(response => {
            setRecurit(response.data)
        })
        .catch(err => console.log(err))
    },[])
    return (
        <div id="innerWrapper">
            <div id="clubInfoWrapper">
                <div id="clubInfo">
                    <div>
                        <p style={{float: "left"}}>동아리 모집 게시판</p>
                        <Link to="/recruitpostwrite"><p style={{float:"right"}} id="registBtn">등록하기</p></Link>
                        <table>
                            <tr>
                                <td>No</td>
                                <td>제목</td>
                                <td>작성자</td>
                                <td>날짜</td>
                            </tr>
                            {
                                recurit.map((item, index) => {
                                    console.log(item)
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
    );
}

export default Recruit;