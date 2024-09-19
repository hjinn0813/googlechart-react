// 막대 그래프 렌더링 실험

import React, { useEffect, useRef } from 'react';

export default function BarGraph() {
  const barRef = useRef(null);

  useEffect(() => {
    const loadBarChart = () => {
      window.google.charts.load('current', { packages: ['corechart', 'bar'] });
      // 기본 패키지에 bar 차트를 포함해서 가져오겠다
      window.google.charts.setOnLoadCallback(drawBarChart);
    };

    const drawBarChart = () => {
      const data = new window.google.visualization.DataTable();
      // DataTable() => 막대 그래프를 그리기 위한 테이블 생성 메소드

      data.addColumn('timeofday', 'Time of Day');
      data.addColumn('number', 'Sales');
      // addColumn(형식, 이름) => 테이블에 열 추가
      // 순서 바뀌어도 데이터 내용은 안 바뀜. options에서 지정된 것에만 영향을 받는다.

      data.addRows([
        [{ v: [8, 0, 0], f: '8 am' }, 3],
        [{ v: [9, 0, 0], f: '9 am' }, 2],
        [{ v: [10, 0, 0], f: '10 am' }, 5],
        [{ v: [11, 0, 0], f: '11 am' }, 4],
        [{ v: [12, 0, 0], f: '12 pm' }, 5],
        [{ v: [13, 0, 0], f: '1 pm' }, 2],
        [{ v: [14, 0, 0], f: '2 pm' }, 3],
        [{ v: [15, 0, 0], f: '3 pm' }, 7],
        [{ v: [16, 0, 0], f: '4 pm' }, 4],
        [{ v: [17, 0, 0], f: '5 pm' }, 5],
        // addRows => 테이블에 행 추가
        // 가로축의 값 => { v: [hour, min, sec], f: '8 am' }
        // 세로축의 값 => 3
      ]);

      const options = {
        title: 'Sales',

        // 가로축 설명
        hAxis: {
          title: 'Time of Day',
          format: 'h:mm a',
          // 시간과 분을 포맷한다. a는 am,pm 표시를 의미

          viewWindow: {
            min: [7, 30, 0],
            max: [17, 30, 0],
            // [hour, min, sec]
          },
        },

        vAxis: {
          // 세로축 설명
          title: 'Rating (scale of 1-10)',
        },
      };

      // 시각화 클래스: 세로 막대형으로 시각화하겠다
      const chart = new window.google.visualization.ColumnChart(
        document.getElementById('bar_chart')
      );

      chart.draw(data, options);
    };

    if (!window.google) {
      const script = document.createElement('script');
      script.src = 'https://www.gstatic.com/charts/loader.js';
      script.onload = loadBarChart;
      document.body.appendChild(script);
    } else {
      loadBarChart();
    }
  });

  return (
    <div
      ref={barRef}
      id="bar_chart"
      style={{ width: '800px', height: '600px' }}
    ></div>
  );
}
