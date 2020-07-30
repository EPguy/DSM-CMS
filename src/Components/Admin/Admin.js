import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Club from '../../Images/club1.png';
import {Link} from 'react-router-dom';
import {server} from '../../Server/api';
import './Admin.css';
import * as moment from 'moment'

function Admin() {
    const [notification, setNotification] = useState([]);
    const [excelURL, setExcelURL] = useState('');
    const getExcel = () => {
       
    }
    const click = (id) => {
        window.location.href = `/posts/${id}`
    }
    useEffect(() => {
        axios.get(`${server}/posts?type=NOTIFICATION`)
        .then(response => {
            setNotification(response.data)
        })
        .catch(err => console.log(err))
        axios.get(`${server}/clubs/members`)
        .then(response => {
            console.log(response.data)
            setExcelURL(response.data)
        })
        .catch(err => console.log(err))
    },[])
    return (
        <div id="innerWrapper">
            <div id="clubInfo">
                <div>
                    <p  style={{float:"left"}}>공지사항</p>
                    <a href="/adminwrite"><p style={{marginLeft: "30px", float:"right"}} id="registBtn">등록하기</p></a>
                    <a href={`${server}/clubs/members`}><p onClick={getExcel} style={{marginLeft: "30px", float:"right"}} id="excelbutton">동아리명단 출력</p></a>
                    <table>
                        <tr>
                            <td>No</td>
                            <td>제목</td>
                            <td>날짜</td>
                        </tr>
                        {
                            notification.map((item, index) => {
                                return (
                                    <tr>
                                        <td onClick={() => click(item.post_id)}>{item.post_id}</td>
                                        <td onClick={() => click(item.post_id)}>{item.title}</td>
                                        <td onClick={() => click(item.post_id)}>{moment(item.date_time).format('YYYY/MM/DD')}</td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Admin;