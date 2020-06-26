import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
// import Main from '../past/Main'
import Main from './pages/Main'
import Login from "./pages/Login";
import Register from "./pages/Register";
import TestPage from "./pages/TestPage";
// import FriendListMobile from "../past/FriendListMobile";

/*
남은 것 (2020-06-25)
PC 페이지
-1. 웹_회원가입2 (OTP 입력창)
-2. 웹_친구추가_번호 (번호 보여주는 창)

-a. 친구목록_삭제팝업

모바일 페이지
-1. 초대받은자_otp입력
-1-1. 닉네임설정
-2. 로그인_회원가입

-a. 친구목록_삭제
-b. 친구목록_삭제팝업
-c. 친구목록_추가번호

(+api 호출창)

남은 것 (2020-06-26)

모바일 : 나눔스퀘어 ac-크기 30-자간 60
웹 : 나눔스퀘어 ac-크기 40-자간 80

-웹 : 180 90 30
-모바일 : 90 45 0

PC 페이지
1. 닉네임 설정 폰트


모바일 페이지
1. 닉네임 설정 폰트


 */

function App() {
  return (
      <BrowserRouter>
        <Switch>
            {/*<Route exact path='/' component={Main}/>*/}
            <Route path='/main' component={Main}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/test' component={TestPage}/>
            {/*<Route path='/friend' component={FriendListMobile}/>*/}
          {/*<Route path='/info/:title' component={Info}/>*/}
          {/*<Route component={Error404}/>*/}
        </Switch>
      </BrowserRouter>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
