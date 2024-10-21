// login with zustand

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore'; // Zustand 스토어
import '../style/Login.scss';

export default function Login() {
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const navigate = useNavigate();
  const { login } = useStore(); // 로그인 함수 가져오기

  /* 테스트용 아이디와 비밀번호 */
  const testUserId = 'hong';
  const testUserPw = 'honghong1!';

  const verifyId = () => {
    if (!userId) return '아이디를 입력해주세요.';
    if (
      userId.length < 4 ||
      userId.length > 10 ||
      !/^[a-zA-Z0-9]+$/.test(userId)
    )
      return '아이디는 4 ~ 10자의 영문&숫자입니다.';
    if (userId !== testUserId) return '아이디가 일치하지 않습니다.';
    return '';
  };

  const verifyPw = () => {
    if (!userPw) return '비밀번호를 입력해주세요.';
    if (
      userPw.length < 8 ||
      userPw.length > 15 ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(userPw)
    )
      return '비밀번호는 특수문자 포함 8 ~ 15자입니다.';
    if (userPw !== testUserPw) return '비밀번호가 일치하지 않습니다.';
    return '';
  };

  const handleLogin = () => {
    const idError = verifyId();
    const pwError = verifyPw();

    if (idError) {
      alert(idError);
      return;
    }
    if (pwError) {
      alert(pwError);
      return;
    }

    // 로그인 성공 시 정보 저장
    login(); // Zustand 스토어의 login 호출
    navigate('/');
  };

  /* 회원가입 페이지 이동 버튼 */
  const toRegister = () => {
    navigate('/register');
  };

  return (
    <div className="lg-wrap">
      <div className="lg-title">Login</div>
      <div className="lg-input">
        <input
          type="text"
          className="lg-focus userId"
          placeholder="아이디"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="password"
          className="lg-focus password"
          placeholder="비밀번호"
          value={userPw}
          onChange={(e) => setUserPw(e.target.value)}
        />
        <div className="lg-apply">
          <button className="lg-apply-btn" onClick={handleLogin}>
            확인
          </button>
        </div>
      </div>
      <div className="lg-btns">
        <button className="register" onClick={toRegister}>
          아이디로 회원가입
        </button>
      </div>
    </div>
  );
}
