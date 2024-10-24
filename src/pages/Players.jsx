// volleyball players from fastapi

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/Players.scss';

const getPlayers = async () => {
  const URL = 'http://127.0.0.1:8001/players';
  const resp = await axios.get(URL);
  return resp.data;
};

export default function Players() {
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    queryKey: ['player'],
    queryFn: () => getPlayers(),
    enabled: true, // 쿼리 항상 실행
    refetchOnWindowFocus: false,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="body">
      <div className="title">
        <div>기업은행 알토스 배구단</div>
        <div>2024~25 시즌 선수 명단</div>
      </div>
      <div className="cards">
        {data.map((player) => (
          <div
            className="players"
            key={player.id}
            onClick={() => navigate(`/players/${player.id}`)}
          >
            <h2>{player.name}</h2>
            <p>
              <b>번호:</b> {player.number}
            </p>
            <p>
              <b>포지션:</b> {player.position}
            </p>
            <p>
              <b>V리그 데뷔:</b> {player.debut}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
