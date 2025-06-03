import { useReducer } from "react";

// 1. 상태(state)의 타입 정의
interface State {
  count: number;
}

// 2. 액션(action)의 타입 정의
// == 수행 가능한 액션의 종류 정의
type Action = { type: "increment" } | { type: "decrement" } | { type: "reset" };

// 3. 리듀서 함수 정의
// 현재 상태 + 액션 -> 새로운 상태를 반환하는 함수
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      return state; // 없어도됨
  }
}

// 4. 컴포넌트에서 useReducer 사용
const ReducerCounter: React.FC = () => {
  // useReducer() : React에서 상태(state)를 관리하기 위한 Hook으로,
  // 상태와 상태 변경 로직을 함수로 분리하여 구조적이고
  // 예측 가능한 상태 관리를 가능하게 해줌.
  // 언제 사용?
  // 1. 상태 변경 로직이 복잡할 때
  // 2. 상태가 여러 속성으로 구성되어 있을 때
  // 3. 액션에 따라 다양한 분기 처리가 필요할 때

  const [state, dispatch] = useReducer(reducer, { count: 0 });
  // const [state, dispatch] = useReducer(reducer, initialState);
  // reducer: (state, action) => newState 형태의 함수
  // initialState: 초기 상태
  // state: 현재 상태
  // dispatch: 상태 변경을 위한 액션을 발생시키는 함수

  return (
    <div>
      <h2>Count: {state.count}</h2>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
};

export default ReducerCounter;
