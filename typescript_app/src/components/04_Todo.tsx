interface Todo {
  id: number; // 고유 id
  text: string; // 내용
  completed: boolean; // 완료여부
}

// todos: Todo[]
// todos 라는 이름의 배열을 정의 : 해당 배열은 Todo 배열 타입.
const todos: Todo[] = [
  { id: 1, text: "타입스크립트 배우기", completed: false },
  { id: 2, text: "리액트 복습하기", completed: true },
];

const TodoList: React.FC = () => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.text} {todo.completed ? "완료" : "미완료"}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
