import useTodoStore from "../store/todoStore";

function TodoList() {
  const { todos, toggleTodo, removeTodo } = useTodoStore();
  // useTodoStore에서 상태 todos, 함수 toggleTodo, 함수 removeTodo 구독

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <span
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.text}
          </span>
          <button onClick={() => removeTodo(todo.id)}>삭제</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
