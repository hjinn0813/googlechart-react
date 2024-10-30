// altos detail

import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../style/Altos.scss';

const getAltosById = async (id) => {
  const URL = '/Altos.json'; // URL 수정
  const resp = await axios.get(URL);
  const altos = resp.data;
  return altos.find((player) => player.id === parseInt(id));
  // ID에 해당하는 선수 찾기
};

export default function AltosDetail() {
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 선수 ID 가져오기
  const { data, error, isLoading } = useQuery({
    queryKey: ['altos', id],
    queryFn: () => getAltosById(id),
    enabled: true,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // 버튼 동작을 위한 정의
  const dataLength = 20; // JSON ID 번호로 설정
  const currentId = parseInt(id);
  const previousId = currentId > 1 ? currentId - 1 : null;
  const nextId = currentId < dataLength ? currentId + 1 : null;

  return (
    <div className="altos-wrap">
      <div className="altos-detail">
        <h2>{data.name}</h2>
        <table>
          <tr>
            <th>등번호</th>
            <td>{data.backNo}</td>
          </tr>
          <tr>
            <th>생일</th>
            <td>{data.birthday}</td>
          </tr>
          <tr>
            <th>신장</th>
            <td>{data.height}cm</td>
          </tr>
          <tr>
            <th>포지션</th>
            <td>{data.position}</td>
          </tr>
          <tr>
            <th>연봉</th>
            <td>{data.salary.toLocaleString()}&nbsp;천원</td>
          </tr>
          <tr>
            <th>옵션</th>
            <td>{data.option.toLocaleString()}&nbsp;천원</td>
          </tr>
          <tr>
            <th>V리그 데뷔</th>
            <td>
              {data.debutSeason}에서
              <br />
              {data.debutTeam} 지명
            </td>
          </tr>
          <tr>
            {data.info ? (
              <>
                <th>특이사항</th>
                <td>{data.info}</td>
              </>
            ) : null}
          </tr>
        </table>
      </div>
      <div className="btn-area">
        {previousId && (
          <div
            className="altos-prev"
            onClick={() => navigate(`/altos/${previousId}`)}
          >
            이전 선수
          </div>
        )}
        <div className="altos-all" onClick={() => navigate(`/altos`)}>
          전체 목록
        </div>
        {nextId && (
          <div
            className="altos-next"
            onClick={() => navigate(`/altos/${nextId}`)}
          >
            다음 선수
          </div>
        )}
      </div>
    </div>
  );
}
