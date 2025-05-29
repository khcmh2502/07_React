import { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
// https://recharts.org/en-US
// npm install recharts

function Chart() {
  const data = [
    // 오늘기준으로 일주일(7일내)의 데이터를 얻어옴
    {
      name: "신규,이탈,접속현황",
      date: "2025.01.01",
      in: "5",
      out: "1",
      visitor: "31",
    },
    {
      name: "신규,이탈,접속현황",
      date: "2025.01.02",
      in: "2",
      out: "0",
      visitor: "14",
    },
    {
      name: "신규,이탈,접속현황",
      date: "2025.01.03",
      in: "30",
      out: "7",
      visitor: "23",
    },
    {
      name: "신규,이탈,접속현황",
      date: "2025.01.04",
      in: "37",
      out: "0",
      visitor: "37",
    },
    {
      name: "신규,이탈,접속현황",
      date: "2025.01.05",
      in: "17",
      out: "2",
      visitor: "86",
    },
    {
      name: "신규,이탈,접속현황",
      date: "2025.01.06",
      in: "39",
      out: "1",
      visitor: "70",
    },
    {
      name: "신규,이탈,접속현황",
      date: "2025.01.07",
      in: "50",
      out: "6",
      visitor: "30",
    },
  ];

  return (
    <>
      <h2>BoardProject 회원 유입/이탈 추이</h2>
      {/* 높이의 경우 100%라고 문자열로 쓰면 화면에 렌더링 불가 */}
      <ResponsiveContainer width="100%" height={500}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          {/* x축의 기준이 되고 싶은 키 dataKey=date */}
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="in"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="out"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Area
            type="monotone"
            dataKey="visitor"
            stackId="1"
            stroke="#ffc658"
            fill="#ffc658"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}

export default Chart;
