// header

import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../store/useStore'; // Zustand 스토어 가져오기
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import '../style/Header.scss';

export default function Header() {
  const [currentTime, setCurrentTime] = useState('');
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const logout = useStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // 스토어에서 로그아웃 함수 가져와서 상태 업데이트
    navigate('/');
  };

  /* 현재 시간 렌더링 */
  useEffect(() => {
    function updateTime() {
      const now = new Date();
      const formattedDate = now.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      const formattedTime = now.toLocaleTimeString();
      setCurrentTime(`${formattedDate} ${formattedTime}`);
    }

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    // 컴포넌트 언마운트 시 인터벌 해제
    return () => clearInterval(intervalId);
  }, []);

  return (
    <header>
      <section className="upper">
        <div className="time">오늘은, {currentTime}</div>
        <div className="loginbtn">
          {isLoggedIn ? (
            <div className="header-link" onClick={handleLogout}>
              <LogoutIcon className="icon" />
              <div>Logout</div>
            </div>
          ) : (
            <Link to="/Login" className="header-link">
              <LoginIcon className="icon" />
              <div>Login</div>
            </Link>
          )}
        </div>
      </section>
      <section className="btns">
        <div className="header-btns">
          <Link to="/" className="header-link">
            <div className="header-txt">메인</div>
          </Link>
        </div>
        <div className="header-btns">
          <Link to="/item" className="header-link">
            <div className="header-txt">파이형</div>
          </Link>
        </div>
        <div className="header-btns">
          <Link to="/line" className="header-link">
            <div className="header-txt">라인형</div>
          </Link>
        </div>
        <div className="header-btns">
          <Link to="/bar" className="header-link">
            <div className="header-txt">막대형</div>
          </Link>
        </div>
        <div className="header-btns">
          <Link to="/table" className="header-link">
            <div className="header-txt">테이블</div>
          </Link>
        </div>
      </section>
    </header>
  );
}
