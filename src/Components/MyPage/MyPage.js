import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Club from '../../Images/club1.png';
import cookie from 'react-cookies';
import Notice from '../../Images/notice.png';
import Left from '../../Images/btn-left.png';
import Right from '../../Images/btn-right.png';
import './MyPage.css';
import axios from 'axios';
import {server} from '../../Server/api';
function MyPage(props) {
    const [scout, setScout] = useState([]);
    const userData = props.userData;
    const [introduce, setIntroduce] = useState(userData.club);
    const [password, setPassword] = useState(userData.name);
    useEffect(() => {
        axios.get(`${server}/scouts`,{
            headers: {
                "X-Access-Token": localStorage.getItem('token')
            }
        })
        .then(response => setScout(response.data))
        .catch(err => console.log(err))
    }, [])
    const onPost = () => {
        axios.patch(`${server}/users/me`, {
            introduce: introduce,
            password: password
        },{
            headers: {
                "X-Access-Token": localStorage.getItem('token')
            }
        }).then(response => {
            alert('수정 완료!')
        }).catch(err => {
            console.log(err)
        })
    }
    const accept = (scout_id) => {
        axios.patch(`${server}/scouts/${scout_id}`, {}, {
            headers: {
                "X-Access-Token": localStorage.getItem("token")
            }
        }).then(response => {
            alert('수락 완료!')
            window.location.href = "/";
            console.log(response.data)
        }).catch(err => {
            alert(err);
            console.log(err)
        })
    }
    const cancle = (scout_id) => {
        axios.delete(`${server}/scouts/${scout_id}`, {
            headers: {
                "X-Access-Token": localStorage.getItem("token")
            }
        }).then(response => {
            alert('거절 완료!')
            window.location.href = "/";
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div id="innerWrapper">
            <div class="mypage">
                <div class="mypage-title">마이페이지</div>
                <div class="mypage-item">
                    <div>이름</div>
                    <input type="text" disabled class="form-control" placeholder={userData.name}/>
                </div>
                <div class="mypage-item">
                    <div>소속 동아리</div>
                    <input type="text"  disabled class="form-control" placeholder={userData.club}/>
                    <button type="button" class="btn btn-danger">동아리탈퇴</button>
                </div>
                <div class="mypage-item">
                    <div>자기소개</div>
                    <input type="text" onChange={(e) => setIntroduce(e.target.value)} class="form-control" placeholder={userData.introduce}/>
                </div>
                <div class="mypage-item">
                    <div>비밀번호 변경</div>
                    <input type="text" onChange={(e) => setPassword(e.target.value)} class="form-control" placeholder="password input"/>
                </div>
                <div class="mypage-item">
                    <div>비밀번호 재확인</div>
                    <input type="text" class="form-control" placeholder="password input"/>
                    {/*<button type="button" class="btn btn-primary">비밀번호 변경</button>*/}
                </div>
                <button style={{marginTop:"20px"}} onClick={onPost} type="button" class="btn btn-success">저장하기</button>
                
                <div style={{marginTop:"40px"}}class="mypage-title">스카웃 제의</div>
                <table>
                    <tbody>
                        {
                            scout.map((item, index) => {
                                return (
                                    <><td>{item.scout_id}</td><td>{item.target}</td><td>{item.club}</td><td><button onClick={() => accept(item.scout_id)}>수락</button><button onClick={() => cancle(item.scout_id)}>거절</button></td></>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default MyPage;