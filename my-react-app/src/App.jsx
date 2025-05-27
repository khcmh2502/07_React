import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useState } from "react";
import Exam1 from "./components/Exam1";
import Exam2 from "./components/Exam2";
import Exam3 from "./components/Exam3";
import Exam4 from "./components/Exam4";
import Exam5 from "./components/Exam5";
import Exam6 from "./components/Exam6";
import Exam7 from "./components/Exam7";
import TodoList from "./components/TodoList";

function App() {
  // 상태(state)
  const [showExam, setShowExam] = useState(true);

  return (
    // js 주석
    // <></> : fragment (html 역할 X)
    /* 
    jsx 주석
    <>
      <h1>Hello world</h1>
      <h1>Hello world</h1>
    </>
     */
    // <>
    //   <button onClick={() => setShowExam(!showExam)}>클릭</button>
    //   {/* showExam 이 true면 화면에 Exam1 컴포넌트 호출하여 렌더링함 */}
    //   {showExam && <Exam2 mihyun="hello" test="world" />}
    // </>
    // <Exam3 />
    // <Exam4 />
    //<Exam5 />
    //<Exam6 />
    //<Exam7 />
    <TodoList />
  );
}

export default App;
