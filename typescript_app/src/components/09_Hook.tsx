import { useState } from "react";

// 커스텀 훅(Custom Hook)
// React의 내장 훅(useState, useEffect 등)을 조합해서 만든 나만의 재사용 가능한 함수
// - 이름은 반드시 use로 시작해야 함
// - 로직 재사용 목적: 여러 컴포넌트에서 같은 상태/동작을 쓸 수 있도록 할 것
// - 일반 함수처럼 보이지만, 내부에서 useState, useEffect 등 훅을 쓸 수 있음
function useToggle(initial: boolean = false): [boolean, () => void] {
  // 매개변수 initial: 토글 상태의 초기값 (기본값은 false)
  // 반환값: [boolean, function] 형태의 튜플
  // - 첫 번째는 현재 상태 (true 또는 false)
  // - 두 번째는 상태를 반전시키는 함수

  const [state, setState] = useState<boolean>(initial);
  const toggle = () => setState((prev) => !prev);
  // (prev) => !prev : 이전 값을 반전시켜 새로운 값으로 저장
  return [state, toggle];
}

const ToggleComponent: React.FC = () => {
  const [on, toggle] = useToggle();

  return (
    <div>
      <p>{on ? "켜짐" : "꺼짐"}</p>
      <button onClick={toggle}>토글</button>
    </div>
  );
};

export default ToggleComponent;
