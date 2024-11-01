// spiders players all

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../style/Spiders.scss';

const getSpiders = async () => {
  const URL = 'http://127.0.0.1:8001/spiders';
  const resp = await axios.get(URL);
  return resp.data;
};

export default function Spiders() {
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    queryKey: ['spiders'],
    queryFn: () => getSpiders(),
    enabled: true, // 쿼리 항상 실행
    refetchOnWindowFocus: false,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="body">
      <div className="spiders-title">
        <div>흥국생명 핑크스파이더스 배구단</div>
        <div>2024~25 시즌 선수 명단</div>
      </div>
      <table>
        <thead className="p-head">
          <tr className="p-row">
            <th className="p-att">등번호</th>
            <th className="p-att">이름</th>
            <th className="p-att">생일</th>
            <th className="p-att">신장</th>
            <th className="p-att">포지션</th>
            <th className="p-att">연봉(천원)</th>
            <th className="p-att">옵션(천원)</th>
            <th className="p-att">V리그 데뷔</th>
            <th className="p-att">특이사항</th>
          </tr>
        </thead>
        <tbody className="p-body">
          {data.map((spiders) => (
            <tr key={spiders.id} className="p-row">
              <td className="p-value">{spiders.backNo}</td>
              <td
                className="spiders-name p-value"
                onClick={() => navigate(`/spiders/${spiders.id}`)}
              >
                <b>{spiders.name}</b>
              </td>
              <td className="p-value">{spiders.birthday}</td>
              <td className="p-value">{spiders.height}cm</td>
              <td className="p-value">{spiders.position}</td>
              <td className="p-value">{spiders.salary.toLocaleString()}</td>
              <td className="p-value">{spiders.option.toLocaleString()}</td>
              <td className="p-value">
                {spiders.debutSeason},&nbsp;{spiders.debutTeam}
              </td>
              <td className="p-value">{spiders.info ? spiders.info : null}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
