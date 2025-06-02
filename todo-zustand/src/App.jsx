import "./App.css";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div>
      <h1>Zustand Todo List</h1>
      <TodoInput />
      <TodoList />
    </div>
  );
}

export default App;
