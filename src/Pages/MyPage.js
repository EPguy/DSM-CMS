import React from 'react';
import Header from '../Components/Header/Header';
import MyPage from '../Components/MyPage/MyPage';

function MyPagePage(props) {
    console.log(props)
    return(
        <>
            <MyPage userData={props.location.state.userData}/>
        </>
    )
};

export default MyPagePage;