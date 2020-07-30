import React, {useEffect, useState} from 'react';
import Header from '../Header/Header';
import Club from '../../Images/club1.png';
import Notice from '../../Images/notice.png';
import Left from '../../Images/btn-left.png';
import Right from '../../Images/btn-right.png';
import './TranserM.css';
import cookie from 'react-cookies';
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
function TranserM() {
    const scout = (number) => {
        axios.post(`${server}/scouts`, {
            target: number
        }, {
            headers: {
                "X-Access-Token": localStorage.getItem('token')
            }
        })
        .then(response => {
            alert('스카웃 신청 완료!')
            console.log(response)
        })
        .catch(err => {
            alert('스카웃 신청 오류!')
            console.log(err)
        })
    }
    const click = (id) => {
        window.location.href = `/posts/${id}`
    }
    const [transerM, setTranserM] = useState([]);
    useEffect(() => {
        axios.get(`${server}/posts?type=RESUME`)
        .then(response => {
            setTranserM(response.data)
        })
        .catch(err => console.log(err))
    },[])
    return (
        <div id="innerWrapper">
            <div id="clubInfoWrapper">
                <div id="clubInfo">
                    <div>
                        <p style={{float: "left"}}>이적시장</p>
                        <Link to="/transerMpostwrite"><p style={{float:"right"}} id="registBtn">등록하기</p></Link>
                        <table>
                            <tr>
                                <td>No</td>
                                <td>제목</td>
                                <td>작성자</td>
                                <td>날짜</td>
                                <td>스카웃</td>
                            </tr>
                            {
                                transerM.map((item, index) => {
                                    console.log(item)
                                    return (
                                        <tr>
                                            <td onClick={() => click(item.post_id)}>{item.post_id}</td>
                                            <td onClick={() => click(item.post_id)}>{item.title}</td>
                                            <td onClick={() => click(item.post_id)}>{item.writer}</td>
                                            <td onClick={() => click(item.post_id)}>{moment(item.date_time).format('YYYY/MM/DD')}</td>
                                            <td class="transer-td"><p onClick={() => scout(item.writer.split('-')[0])} style={{float:"right"}} id="scoutButton">스카웃</p></td>
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

export default TranserM;