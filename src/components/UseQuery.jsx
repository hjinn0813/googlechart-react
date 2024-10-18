/* batdream 날씨위젯 코드를 react query로 변환 */
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import '../style/UseQuery.scss';

/* api 설정 */
const WEATHER_API = {
  key: process.env.REACT_APP_WEATHER_API_KEY,
  base: 'https://api.openweathermap.org/data/2.5/',
};

/* 위치 가져오기 */
const getCurrentLocation = () =>
  new Promise((res, rej) => {
    // Promise를 통해 성공(res)과 실패(rej)를 모두 처리
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        res({ lat: latitude, lon: longitude });
        // latitude와 longitude를 구조분해할당하여 한번에 가져옴
      },
      (error) => {
        rej(error);
      }
    );
  });

/* api 불러오기 */
const getNowWeather = async ({ lat, lon }) => {
  const url = `${WEATHER_API.base}weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API.key}&units=metric&lang=kr`;
  const response = await axios.get(url);
  // axios로 get요청 보내기
  return response.data;
  // axios는 자동으로 JSON을 파싱해 주기 때문에 바로 반환
};

/* 위젯 클릭시 네이버 날씨로 이동 */
const goToNaverWeather = () => {
  let url = `https://weather.naver.com`;
  window.open(url, '_blank'); // 새 창에서 열기
};

export default function UseQuery() {
  const [location, setLocation] = useState(null);
  // useState로 필요 시에만 위치 정보 업데이트

  useEffect(() => {
    getCurrentLocation()
      .then((loc) => setLocation(loc))
      .catch((error) => console.error('Location error:', error));
  }, []);

  /* React Query로 날씨 정보 불러오기 */
  const { data, error, isLoading } = useQuery({
    queryKey: ['weather', location],
    queryFn: () => getNowWeather(location),
    enabled: !!location,
    refetchOnWindowFocus: false,
  });

  /*
  React Query v5부터 useQuery는 쿼리 키와 쿼리 함수를 포함하여
  모든 훅의 설정을 반드시 객체 형태로 전달해야 한다.

  - queryKey: 캐싱과 상태 관리를 최적화하는 쿼리의 고유한 키. v4부터 반드시 배열로 작성
  쿼리 키 'weather', 동적으로 변하는 값 location
  location에 해당하는 값이 없다면 ['weather']의 형식으로 사용

  - queryFn: 실제로 API 요청을 보내서 데이터를 가져오는 함수. 
  
  - enabled: 쿼리를 언제 실행할지 조건 설정.
  여기서는 location이 null이나 undefined가 아닐 때만 true가 되어 쿼리가 동작한다.

  - refetchOnWindowFocus: 사용자가 브라우저를 다시 활성화할 때 데이터를 새로 가져오는 옵션.
  기본적으로는 true로 되어있지만, 여기서는 false로 설정하여 쓸데없는 재요청을 막았다.
  */

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="weather-main" onClick={goToNaverWeather}>
      <div className="weather-place">{data?.name}</div>
      <div className="weather-info">
        {data?.weather[0].icon && (
          <img
            className="weather-icon"
            src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
            alt="Weather-icon"
          />
        )}
        &nbsp;
        <div className="weather">{data?.weather[0].description}</div>
      </div>
      <div className="temp-now">{Math.round(data?.main.temp)}°C</div>
      {/* Axios로 받아온 data에 '점 접근법'으로 prop을 연결해서 가져왔고, 
      data의 옵셔널 체이닝으로 data가 undefined이어도 에러가 발생하지 않는다. */}
    </div>
  );
}
