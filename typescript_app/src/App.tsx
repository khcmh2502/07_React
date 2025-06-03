import "./App.css";
import Hello from "./components/01_Hello";
import Counter from "./components/02_Counter";
import CustomButton from "./components/03_Button";
import TodoList from "./components/04_Todo";
import NameInput from "./components/05_Input";
import ReducerCounter from "./components/06_Reducer";
import UserList from "./components/07_UserList";
import LoginForm from "./components/08_Form";
import ToggleComponent from "./components/09_Hook";

// App.jsx가 아닌 App.tsx

// React.FC :함수형 컴포넌트의 타입을 지정하는 TypeScript 타입 도우미
function App() {
  // 예제 3번관련 함수
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // e: React.MouseEvent<HTMLButtonElement>
    // 이벤트객체 e 의 타입 지정 : 마우스이벤트<HTML상button태그요소>
    alert("버튼이 클릭되었습니다!");
    console.log("이벤트 객체:", e);
  };

  return (
    <>
      {/*<Hello name="world">
        <p>자식이다</p>
      </Hello> */}
      {/* <Counter /> */}
      {/* <CustomButton onClick={handleClick} label="클릭하세요" /> */}
      {/* <TodoList /> */}
      {/* <NameInput />/ */}
      {/* <ReducerCounter /> */}
      {/* <UserList /> */}
      {/* <LoginForm />/ */}
      {/* <ToggleComponent /> */}
    </>
  );
}

export default App;
