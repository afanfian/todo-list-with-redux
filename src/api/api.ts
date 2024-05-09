import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Todo } from "@/interfaces/type";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], { _start?: number; _limit?: number }>({
      query: ({ _start = 0, _limit = 10 }) =>
        `todos?_start=${_start}&_limit=${_limit}`,
    }),
    addTodo: builder.mutation<any, Partial<Todo>>({
      query: (newTodo) => ({
        url: `todos`,
        method: "POST",
        body: newTodo,
      }),
    }),
  }),
});

export const { useGetTodosQuery, useAddTodoMutation } = todoApi;
