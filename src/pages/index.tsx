import { useGetTodosQuery } from "@/api/api";
import { useState } from "react";
import {
  AiOutlineUser,
  AiOutlineIdcard,
  AiOutlineFileText,
  AiOutlineCheck,
} from "react-icons/ai";

const TodoList = () => {
  const [filterCompleted, setFilterCompleted] = useState("all");
  const [start, setStart] = useState(0);

  const {
    data: todos = [],
    error,
    isLoading,
  } = useGetTodosQuery({
    _start: start,
    _limit: 10,
  });

  const totalTodos = todos.length;
  const totalPages = Math.ceil(totalTodos / 10);
  const currentPage = Math.ceil((start + 1) / 10);

  const filteredTodos = todos.filter((todo) => {
    if (filterCompleted === "all") {
      return true;
    } else if (filterCompleted === "completed") {
      return todo.completed;
    } else {
      return !todo.completed;
    }
  });

  const handleNextPage = () => {
    const nextStart = start + 10;
    if (nextStart < 200) {
      setStart(nextStart);
    }
  };

  const handlePreviousPage = () => {
    if (start >= 10) {
      setStart(start - 10);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
      <div className="flex justify-end mb-4">
        <select
          value={filterCompleted}
          onChange={(e) => setFilterCompleted(e.target.value)}
          className="px-2 py-1 rounded-md bg-white border border-gray-300"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id} className="mb-4 p-4 rounded-md shadow-sm bg-white">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                readOnly
                className="mr-2"
              />
              <span
                className={`flex-1 ${todo.completed ? "line-through" : ""}`}
              >
                <AiOutlineUser className="inline-block mr-1" />
                <span className="font-semibold text-gray-800">
                  User ID:
                </span>{" "}
                {todo.userId}, <AiOutlineIdcard className="inline-block mr-1" />
                <span className="font-semibold text-gray-800">ID:</span>{" "}
                {todo.id}, <AiOutlineFileText className="inline-block mr-1" />
                <span className="font-semibold text-gray-800">Title:</span>{" "}
                {todo.title}, <AiOutlineCheck className="inline-block mr-1" />
                <span className="font-semibold text-gray-800">
                  Completed:
                </span>{" "}
                {todo.completed ? "Yes" : "No"}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-4">
        <p>
          Showing page {currentPage} of {totalPages}
        </p>
        <div>
          <button
            onClick={handlePreviousPage}
            disabled={start === 0}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md disabled:cursor-not-allowed disabled:bg-gray-300 mr-2"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={start + 10 >= 200}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed mr-2 text-white rounded-md "
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
