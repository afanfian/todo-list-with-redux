import { useAddTodoMutation } from "@/api/api";
import { useState } from "react";

const AddTodoForm = () => {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [addTodo, { isLoading }] = useAddTodoMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo({ title, completed });
    setTitle("");
    setCompleted(false);
  };

  return (
    <div className="max-w-sm mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Todo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-1 text-gray-800">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="completed"
            className="flex items-center cursor-pointer"
          >
            <input
              type="checkbox"
              id="completed"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              className="mr-2 cursor-pointer"
            />
            <span className="text-gray-800">Completed</span>
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-600 focus:outline-none"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Todo"}
        </button>
      </form>
    </div>
  );
};

export default AddTodoForm;
