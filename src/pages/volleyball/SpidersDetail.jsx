import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../style/Spiders.scss';

const getSpidersById = async (id) => {
  const URL = `http://127.0.0.1:8001/spiders/${id}`;
  const resp = await axios.get(URL);
  return resp.data;
};

// data.length 확인을 위해 전체 목록 불러오기
const getAllSpiders = async () => {
  const URL = 'http://127.0.0.1:8001/spiders';
  const resp = await axios.get(URL);
  return resp.data;
};

export default function SpidersDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  /* 모든 선수 목록 쿼리 */
  const { data: allPlayers, error: allPlayersError } = useQuery({
    // data, error 변수 이름 변경
    queryKey: ['allSpiders'],
    queryFn: getAllSpiders,
    // 필요 시에만 함수 호출
    enabled: true,
  });

  const { data, error } = useQuery({
    queryKey: ['spiders', id],
    queryFn: () => getSpidersById(id),
    enabled: true,
    refetchOnWindowFocus: false,
  });

  // 선수 목록이 로딩 중이거나 에러가 발생한 경우 처리
  if (allPlayersError)
    return <div>Error loading players: {allPlayersError.message}</div>;
  if (!allPlayers) return <div>Loading...</div>;

  /* 전체 목록을 통해 data.length 확인 */
  const dataLength = allPlayers.length;
  const currentId = parseInt(id);
  const previousId = currentId > 1 ? currentId - 1 : null;
  const nextId = currentId < dataLength ? currentId + 1 : null;

  return (
    <div className="spiders-wrap">
      <div className="spiders-detail">
        {data ? (
          <>
            <h2>{data.name}</h2>
            <table>
              <tbody>
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
                {data.info && (
                  <tr>
                    <th>특이사항</th>
                    <td>{data.info}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          <div>Loading...</div> // 초기 로딩 상태
        )}
      </div>
      <div className="btn-area">
        {previousId && (
          <div
            className="spiders-prev"
            onClick={() => navigate(`/spiders/${previousId}`)}
          >
            이전 선수
          </div>
        )}
        <div className="spiders-all" onClick={() => navigate(`/spiders`)}>
          전체 목록
        </div>
        {nextId && (
          <div
            className="spiders-next"
            onClick={() => navigate(`/spiders/${nextId}`)}
          >
            다음 선수
          </div>
        )}
      </div>
    </div>
  );
}
