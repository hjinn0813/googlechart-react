// 파이형 그래프 렌더링 실험

import React, { useEffect, useRef } from 'react';

export default function GoogleChart() {
  const chartRef = useRef(null);
  // DOM 요소에 접근해서 그래프를 그려야하니까 useRef 정의

  useEffect(() => {
    /* 구글 차트 불러오기 */
    const loadGoogleCharts = () => {
      window.google.charts.load('current', { packages: ['corechart'] });
      // - window.google.charts.load
      // => 브라우저 전역에서 '구글' 객체의 '차트' 속성으로 구글차트 라이브러리를 로드하겠다
      // - current => 최신 버전으로
      // - { packages: ['corechart'] } => 기본 패키지를 가져오겠다

      window.google.charts.setOnLoadCallback(drawPieChart);
      // setOnLoadCallback() => 구글차트가 로드되면 메소드 안에 인자로 들어간 함수를 실행해라
    };

    /* 구글 차트 그리기 */
    const drawPieChart = () => {
      const data = window.google.visualization.arrayToDataTable([
        ['Fruit', 'People'],
        ['Apple', 11],
        ['Banana', 5],
        ['grape', 7],
      ]);
      // - visualization: 구글차트에서 데이터를 시각화하는 기능을 모아놓은 객체
      // - arrayToDataTable(): 배열을 그래프로 변환하는 함수
      // 2차원 배열을 받아서 구글차트가 이해할 수 있는 그래프 형식으로 변환해준다
      // => 브라우저 전체에서 arrayToDataTable()에 인자로 들어가는 배열을
      // 구글차트를 사용해서 시각화할 수 있는 데이터로 변환하겠다는 의미

      const options = {
        title: 'Favorite Fruit',
        colors: ['red', 'orange', 'purple'],
      };

      const chart = new window.google.visualization.PieChart(chartRef.current);
      // 구글차트 종류 중에 파이형 그래프로 시각화하겠다는 의미
      // chartRef.current => 그래프가 그려질 위치 지정
      // - chartRef: useRef로 만든 참조 객체
      // - current: 실제 DOM 요소 위치 찾기.
      // => useRef로 만든 객체에서 실제 값을 얻으려면 current 속성을 통해 접근해야 한다.

      chart.draw(data, options);
    };

    if (!window.google) {
      // !window.google => 만약에 브라우저 전역에 구글 속성이 없으면

      const script = document.createElement('script');
      script.src = 'https://www.gstatic.com/charts/loader.js';
      script.onload = loadGoogleCharts;
      // 스크립트가 완전히 로드되면 loadGoogleCharts 함수 자동 실행
      // (즉시 실행되면 안되니까 괄호 없음)

      document.body.appendChild(script);
    } else {
      loadGoogleCharts();
      // 브라우저 전역에 구글 속성 있으면 함수 바로 실행
    }
  }, []);

  return <div ref={chartRef} style={{ width: '900px', height: '500px' }}></div>;
}
