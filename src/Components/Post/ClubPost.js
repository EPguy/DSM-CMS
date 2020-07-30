import React from 'react';
import './ClubPost.css';

function ClubPost() {
    return (
        <div class="club-post">
            <div class="club-post-wrapper">
                <div class="login-right-input">
                    <div class="edit-title">제목</div>
                    <input  placeholder="자기소개" type="text"/>
                    <div class="login-right-input-line"></div>
                </div>
                <div class="login-right-input">
                    <div class="edit-title">내용</div>
                    <input  placeholder="내용" type="text"/>
                    <div class="login-right-input-line"></div>
                </div>
                <div class="login-right-button">
                        <input type="button" value="작성"/>
                </div>
            </div>
        </div>
    );
}

export default ClubPost;