// 라인 그래프 렌더링 실험

import React, { useEffect, useRef } from 'react';

export default function LineGraph() {
  const lineRef = useRef(null);

  useEffect(() => {
    const loadLineChart = () => {
      window.google.charts.load('current', { packages: ['corechart', 'line'] });
      // 기본 패키지에 line 차트를 포함해서 가져오겠다
      window.google.charts.setOnLoadCallback(drawLineChart);
    };

    const drawLineChart = () => {
      const data = new window.google.visualization.DataTable();
      // DataTable() => 그래프를 그리기 위한 테이블 생성 메소드

      data.addColumn('number', 'X');
      data.addColumn('number', 'sales');
      // addColumn(형식, 이름) => 테이블에 열 추가

      // addRows => 테이블에 행 추가
      // [가로값, 세로값]
      data.addRows([
        [0, 7],
        [1, 10],
        [2, 13],
        [3, 11],
        [4, 18],
        [5, 19],
        [6, 14],
        [7, 17],
        [8, 23],
        [9, 20],
        [10, 22],
        [11, 18],
        [12, 20],
      ]);

      const options = {
        hAxis: {
          // 가로축 설명
          title: 'Time',
        },
        vAxis: {
          // 세로축 설명
          title: 'sales',
        },
      };

      // 시각화 클래스: 라인 차트로 시각화하겠다
      const chart = new window.google.visualization.LineChart(
        document.getElementById('line_chart')
      );

      chart.draw(data, options);
    };

    if (!window.google) {
      const script = document.createElement('script');
      script.src = 'https://www.gstatic.com/charts/loader.js';
      script.onload = loadLineChart;
      document.body.appendChild(script);
    } else {
      loadLineChart();
    }
  });

  return (
    <div
      ref={lineRef}
      id="line_chart"
      style={{ width: '800px', height: '600px' }}
    ></div>
  );
}
