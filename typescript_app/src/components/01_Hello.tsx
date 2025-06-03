import React, { type ReactNode } from "react";

// 1. Props의 타입을 먼저 정의
interface HelloProps {
  name: string;
  children: ReactNode;
  /*React.ReactNode는 광범위하게 사용이 가능한 타입.
  String, Number, boolean, Null, Undefined등 원시타입과
  React Elements, React Fragments 등등 모든것을 받아들임 */
}

// 2. React.FC를 사용해서 함수형 컴포넌트를 정의
// - props가 자동으로 타입 추론됨.
const Hello: React.FC<HelloProps> = ({ name, children }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <div>{children}</div> {/* 자식컴포넌트 렌더링 */}
    </div>
  );
};

export default Hello;
