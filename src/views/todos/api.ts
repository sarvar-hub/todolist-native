import { supabase } from "@src/supabase";

export const fetchTodos = async () => {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

export const addTodoApi = async (title: string) => {
  const { data, error } = await supabase
    .from("todos")
    .insert([{ title }])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteTodoApi = async (id: number) => {
  const { error } = await supabase.from("todos").delete().eq("id", id);
  if (error) throw error;
};
