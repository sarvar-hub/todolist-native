import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTodoApi, deleteTodoApi, fetchTodos } from "./api";
import { ITodo } from "./type";

export const useTodos = () => {
  const queryClient = useQueryClient();

  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const addTodo = useMutation({
    mutationFn: addTodoApi,
    onSuccess: (newTodo) => {
      queryClient.setQueryData(["todos"], (prevTodos: ITodo[]) => [
        newTodo,
        ...(prevTodos ?? []),
      ]);
    },
  });

  const deleteTodo = useMutation({
    mutationFn: deleteTodoApi,
    onSuccess: (_, id) => {
      queryClient.setQueryData(["todos"], (prevTodos: ITodo[]) =>
        prevTodos?.filter((todo: any) => todo.id !== id),
      );
    },
  });

  return { todos, isLoading, error, addTodo, deleteTodo };
};
