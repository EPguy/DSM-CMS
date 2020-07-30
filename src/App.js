import React from 'react';
import { AdminWritePage, AdminPage, TranserMWritePage, RecruitWritePage, PostWritePage, PostViewPage, CluubAdminPage, LoginPage, Home, MyPage, RecruitPage, ClubPostPage,ClubInfoPage, TranserMPage } from './Pages';
import { Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import './App.css';
function App() {
  return (
    <>
      <Header/>
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={LoginPage}/>
      <Route exact path="/mypage" component={MyPage}/>
      <Route exact path="/recruit" component={RecruitPage}/>
      <Route exact path="/clubpost" component={ClubPostPage}/>
      <Route exact path="/clubinfo" component={ClubInfoPage}/>
      <Route exact path="/clubinfo/:clubname" component={ClubInfoPage}/>
      <Route exact path="/transerM" component={TranserMPage}/>
      <Route exact path="/clubAdmin" component={CluubAdminPage}/>
      <Route exact path="/posts/:postid" component={PostViewPage}/>
      <Route exact path="/postwrite" component={PostWritePage}/>
      <Route exact path="/recruitpostwrite" component={RecruitWritePage}/>
      <Route exact path="/transerMpostwrite" component={TranserMWritePage}/>
      <Route exact path="/adminpage" component={AdminPage}/>
      <Route exact path="/adminwrite" component={AdminWritePage}/>
    </>
  );
}

export default App;
