
import { useState } from "react";
import PropTypes from "prop-types";
import { useTodo } from "../contexts/TodoContext";

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`flex items-center border border-gray-300 rounded-lg px-4 py-3 gap-x-4 shadow-md transition-all duration-300 ${
        todo.completed ? "bg-green-100 line-through" : "bg-gray-100"
      } hover:shadow-lg`}
    >
      <input
        type="checkbox"
        className="cursor-pointer accent-blue-500"
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        className={`flex-1 bg-transparent outline-none text-gray-800 font-medium ${
          isTodoEditable ? "border-gray-300 px-3 py-1 rounded-md" : ""
        }`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      <button
        className="inline-flex w-8 h-8 rounded-full text-sm border border-gray-300 justify-center items-center bg-gray-50 hover:bg-gray-100 transition-colors shadow-md"
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "💾" : "✎"}
      </button>

      <button
        className="inline-flex w-8 h-8 rounded-full text-sm border border-gray-300 justify-center items-center bg-gray-50 hover:bg-red-100 transition-colors shadow-md"
        onClick={() => deleteTodo(todo.id)}
      >
        🗑️
      </button>
    </div>
  );
}

// Prop validation using PropTypes
TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    todo: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TodoItem;
