import { useState } from "react";
import useTodoStore from "../store/todoStore";

function TodoInput() {
  const [text, setText] = useState("");
  const addTodo = useTodoStore((state) => state.addTodo); // useTodoStore에서 addTodo라는 함수만 구독

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="할 일 입력"
      />
      <button type="submit">추가</button>
    </form>
  );
}

export default TodoInput;
