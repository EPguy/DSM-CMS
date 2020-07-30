import React, { useEffect,useState } from 'react';
import './ClubAdmin.css';
import Club from '../../Images/club1.png';
import axios from 'axios';
import cookie from 'react-cookies';
import {server} from '../../Server/api';
import {Link} from 'react-router-dom';

function ClubAdmin(props) {
    const [clubData, setClubData] = useState({
        leader: '',
        members: []
    });
    const [number, setNumber] = useState("");
    const [clubName, setClubName] = useState("");
    const [clubLeader, setClubLeader] = useState("");
    const [clubMember, setClubMember] = useState("");
    const [introduce, setIntroduce] = useState("");
    const [postMember, setPostMember] = useState([]);
    const [image, setImage] = useState("");

    const onImageChange = (e) => {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        axios.post(`${server}/files`, formData)
        .then(response => {
            alert('업로드완료')
            setImage(response.data.file_link)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        axios.get(`${server}/applications/${props.userData.club}`, {
            headers: {
                "X-Access-Token": localStorage.getItem('token')
            }
        }).then(response => {
            console.log(response.data)
            setPostMember(response.data)
        }).catch(err => {
            console.log(err)
        })
        axios.get(`${server}/clubs/${props.userData.club}`,{
        }).then(response => {
            setClubData(response.data);
        }).catch(err => {
            console.log(err);
        })
    }, [])
    
    const accept = (application_id) => {
        axios.put(`${server}/applications/${application_id}`,{}, {
            headers: {
                "X-Access-Token": localStorage.getItem("token")
            }
        }).then(response => {
            console.log(response.data)
        }).catch(err => {
            console.log(err)
        })
    }
    const cancle = (application_id) => {
        axios.delete(`${server}/applications/${application_id}`, {
            headers: {
                "X-Access-Token": localStorage.getItem('token')
            }
        }).then(response => {
            alert('거절이 완료되었습니다!')
            window.location.href = "/";
            console.log(response.data)
        }).catch(err => {
            console.log(err)
        })
    }
    const onPost = () => {
        console.log(image, introduce)
        if(image === "") {
            axios.patch(`${server}/clubs/${clubData.club_name}`, {},{
                introduce: introduce,
            },{
                headers: {
                    "X-Access-Token": localStorage.getItem('token')
                }
            }).then(response => {
                alert('수정완료!')
                window.location = `/clubinfo/${clubData.club_name}`
            }).catch(err => {
                console.log(err)
            })
        } else if(introduce === "") {
            axios.patch(`${server}/clubs/${clubData.club_name}`, {
                logo: image
            },{
                headers: {
                    "X-Access-Token": localStorage.getItem('token')
                }
            }).then(response => {
                alert('수정완료!')
                window.location = `/clubinfo/${clubData.club_name}`
            }).catch(err => {
                console.log(err)
            })
        } else {
            axios.patch(`${server}/clubs/${clubData.club_name}`, {
                introduce: introduce,
                logo: image
            },{
                headers: {
                    "X-Access-Token": localStorage.getItem('token')
                }
            }).then(response => {
                alert('수정완료!')
                window.location = `/clubinfo/${clubData.club_name}`
            }).catch(err => {
                console.log(err)
            })
        }
        
    }

    const onAddMember = () => {
        axios.post(`${server}/clubs/${clubData.club_name}/members`, {
            student_number : number
        },{
            headers: {
                "X-Access-Token": localStorage.getItem('token')
            }
        }).then(response => {
            alert('추가되었습니다.')
            window.location.href = "/";
        }).catch(err => {
            alert('오류 발생!')
            console.log(err)
        })
    }

    const onDelMember = (student_number) => {
        console.log(String(student_number))
        axios.delete(`${server}/clubs/${clubData.club_name}/members?student_number=${student_number}`,{
            headers: {
                "X-Access-Token": localStorage.getItem('token')
            }
        }).then(response => {
            alert('추방 완료!')
            window.location.href = "/"
            console.log(response.data)
        }).catch(err => {
            console.log(err)
        })
    }
    var lea = String(clubData.leader);
    var leadernum = lea.split("-");

    var m = String(clubData.members).split(",");
    const memberArr = m.map((member,i) => {
        var mm = member.split("-");
        // return <div class="clubMemberItem" key={i}><input type="text" value={mm[0]} readOnly/> <input type="text" value={mm[1]} readOnly/> <button onClick={onDelMember(mm[0])}>삭제</button> </div>
    });

    return (
        <div id="innerWrapper">
            <div id="clubInfoWrapper">
                <h2 id="clubadmintitle">동아리 관리 페이지</h2>
                <div id="clubInfo">
                    <p>동아리 신청 목록</p>
                    <table>
                        <tbody>
                            {
                                postMember.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{item.application_no}</td><td>{item.applicant}</td><td><button onClick={() => accept(item.application_no)}>수락</button><button onClick={() => cancle(item.application_no)}>거절</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <p>동아리 정보 수정</p>
                    <div>
                        <div class="clubInfoLeft">
                            <div class="clubItem">동아리 로고</div> 
                            <div class="clubItem">동아리명</div> 
                            <div class="clubItem">동아리 소개</div> 
                        </div>
                        <div id="clubInfoRight">
                            <input type="file" onChange={(e) => onImageChange(e)}/><br/>
                            <input type="text" disabled defaultValue={clubData.club_name}/><br/>
                            <input type="text" onChange={(e) => setIntroduce(e.target.value)}  defaultValue={clubData.introduce}/><br/>
                            <div id="editBtn" onClick={onPost} >수정하기</div>
                        </div>
                        
                    </div>
                    <p>현재 동아리원 관리</p>
                    <div class="clubMemberWrapper">
                        <div class="clubMemberLeft" style={{marginTop : '5px'}}>
                            동아리원
                        </div>
                        <div>
                            {
                                clubData.members.map((item, index) => {
                                    return (
                                        <div class="clubMemberItem">
                                            <input type="text" disabled value={item}/> <button onClick={() => onDelMember(item.split('-')[0])}>추방</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    {/*
                    <p>동아리원 추가</p>
                    <div class="clubMemberWrapper">
                        <div class="clubMemberLeft" style={{marginTop : '5px'}}>
                            동아리원 학번 입력
                        </div>
                        <div>
                            <div class="clubMemberItem">
                                <input value={number} onChange={(e) => setNumber(e.target.value)} type="text"/> <button onClick={onAddMember}>추가</button>
                            </div>
                        </div>
                    </div>
                    */}
                </div>
            </div>
        </div>
    );
}

export default ClubAdmin;