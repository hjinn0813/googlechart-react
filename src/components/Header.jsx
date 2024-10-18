// header

import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Header.scss';

export default function Header() {
  return (
    <header>
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
    </header>
  );
}
