
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import { useTodo } from "../contexts/TodoContext";

function Todos() {
  const { todos } = useTodo();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-700">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Manage Your Todos
        </h1>
        <TodoForm />
        <div className="mt-6 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {todos.length > 0 ? (
            <ul className="space-y-4">
              {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600">No todos found for this user.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Todos;
