// volleyball players from fastapi

import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import '../style/Players.scss';
import { useNavigate } from 'react-router-dom';

const getPlayerById = async (id) => {
  const URL = `http://127.0.0.1:8001/players/${id}`;
  const resp = await axios.get(URL);
  return resp.data;
};

export default function PlayerDetail() {
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 선수 ID 가져오기
  const { data, error, isLoading } = useQuery({
    queryKey: ['player', id],
    queryFn: () => getPlayerById(id),
    enabled: true,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="wrap">
      <div className="detail">
        <h2>{data.name}</h2>
        <p>
          <b>번호:</b> {data.number}
        </p>
        <p>
          <b>포지션:</b> {data.position}
        </p>
        <p>
          <b>V리그 데뷔:</b> {data.debut}
        </p>
      </div>
      <div className="back" onClick={() => navigate(`/players`)}>
        이전 화면
      </div>
    </div>
  );
}
