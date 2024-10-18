/* batdream 날씨위젯 코드를 react query로 변환 */
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import '../style/UseQuery.scss';

/* api 불러오기 */
const WEATHER_API = {
  key: process.env.REACT_APP_WEATHER_API_KEY,
  base: 'https://api.openweathermap.org/data/2.5/',
};

/* 위치 가져오기 */
const getCurrentLocation = () =>
  new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        res({ lat: latitude, lon: longitude });
      },
      (error) => {
        rej(error);
      }
    );
  });

/* 날씨정보 불러오기 */
const getNowWeather = async ({ lat, lon }) => {
  const url = `${WEATHER_API.base}weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API.key}&units=metric&lang=kr`;
  const response = await axios.get(url);
  return response.data;
  // axios는 자동으로 JSON을 파싱해 주기 때문에 바로 반환
};

export default function UseQuery() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    getCurrentLocation()
      .then((loc) => setLocation(loc))
      .catch((error) => console.error('Location error:', error));
  }, []);

  /* React Query로 날씨 정보 패칭 */
  const { data, error, isLoading } = useQuery({
    queryKey: ['weather', location], // 쿼리 키
    queryFn: () => getNowWeather(location), // 쿼리 함수
    enabled: !!location,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // 위젯 클릭시 네이버 날씨로 이동
  const goToNaverWeather = () => {
    let url = `https://weather.naver.com`;
    window.open(url, '_blank'); // 새 창에서 열기
  };

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
    </div>
  );
}
