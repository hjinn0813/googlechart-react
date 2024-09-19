// 테이블 그래프 렌더링 실험

import React, { useEffect, useRef } from 'react';

export default function Table() {
  const tableRef = useRef(null);

  useEffect(() => {
    const loadTable = () => {
      window.google.charts.load('current', { packages: ['table'] });
      // 구글 차트 중에 테이블 패키지를 가져오겠다
      window.google.charts.setOnLoadCallback(drawTable);
    };

    const drawTable = () => {
      var data = new window.google.visualization.DataTable();
      // DataTable() => 그래프를 그리기 위한 테이블 생성 메소드

      data.addColumn('string', '날짜');
      data.addColumn('number', '총 매출액');
      data.addColumn('number', '주문건수');

      let totalSales = 0;
      let totalOrders = 0;

      /* 자동으로 날짜 추가하는 로직 */
      const today = new Date();
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        // 날짜를 1일씩 빼서 최근 7일의 날짜를 생성

        /* 예제 매출액, 주문건수 */
        const sales = Math.floor(Math.random() * 1000) + 100;
        // => 100 ~ 1099 사이의 정수 생성, 최소값 100
        const orders = Math.floor(Math.random() * 20) + 1;
        // => 1 ~ 20 사이의 정수 생성, 주문건수가 0이면 안되니까 +1

        // Math.floor() => 숫자를 내림하여 가장 가까운 정수로 만들어주는 함수
        // Math.random() => 0 이상 1 미만 무작위 소수 생성

        data.addRow([date.toLocaleDateString(), sales, orders]);
        // for문 내부에서 일주일치 데이터 row 반복해서 추가

        totalSales += sales;
        totalOrders += orders;
        // 누적으로 더한 합계를 total로 할당
      }

      // 누적으로 더한 합계 행 가장 아래에 추가
      data.addRow(['합계', totalSales, totalOrders]);

      // 시각화 클래스: 구글 차트 중에 테이블로 시각화하겠다
      const table = new window.google.visualization.Table(
        document.getElementById('table_div')
      );

      table.draw(data, { showRowNumber: false, width: '100%', height: '100%' });
      // 준비된 테이블을 그리라는 명령
      // 행 번호 입력 여부 => 불리언으로
    };

    if (!window.google) {
      const script = document.createElement('script');
      script.src = 'https://www.gstatic.com/charts/loader.js';
      script.onload = loadTable;
      document.body.appendChild(script);
    } else {
      loadTable();
    }
  }, []);

  return (
    <div
      ref={tableRef}
      id="table_div"
      style={{ width: '600px', height: '250px' }}
    ></div>
  );
}
