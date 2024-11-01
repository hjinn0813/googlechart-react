// altos players json

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../style/Altos.scss';

const getAltos = async () => {
  const URL = 'http://127.0.0.1:8001/altos';
  const resp = await axios.get(URL);
  return resp.data;
};

export default function Altos() {
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    queryKey: ['altos'],
    queryFn: () => getAltos(),
    enabled: true, // 쿼리 항상 실행
    refetchOnWindowFocus: false,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="body">
      <div className="altos-title">
        <div>기업은행 알토스 배구단</div>
        <div>2024~25 시즌 선수 명단</div>
      </div>
      <table>
        <thead>
          <tr>
            <th>등번호</th>
            <th>이름</th>
            <th>생일</th>
            <th>신장</th>
            <th>포지션</th>
            <th>연봉(천원)</th>
            <th>옵션(천원)</th>
            <th>V리그 데뷔</th>
            <th>특이사항</th>
          </tr>
        </thead>
        <tbody>
          {data.map((altos) => (
            <tr key={altos.id}>
              <td>{altos.backNo}</td>
              <td
                className="altos-name"
                onClick={() => navigate(`/altos/${altos.id}`)}
              >
                <b>{altos.name}</b>
              </td>
              <td>{altos.birthday}</td>
              <td>{altos.height}cm</td>
              <td>{altos.position}</td>
              <td>{altos.salary.toLocaleString()}</td>
              <td>{altos.option.toLocaleString()}</td>
              <td>
                {altos.debutSeason},&nbsp;{altos.debutTeam}
              </td>
              <td>{altos.info ? altos.info : null}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
