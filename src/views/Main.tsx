import Task from "@src/components/Task";
import { useTodos } from "@src/views/todos/useTodos";
import { Platform } from "expo-modules-core";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { todoStyles } from "./todos/style";

export default function Main() {
  const { todos, isLoading, addTodo, deleteTodo } = useTodos();
  const [task, setTask] = useState("");

  const handleAddTask = async () => {
    if (!task) return;

    addTodo.mutate(task, {
      onSuccess: () => {
        setTask("");
        Keyboard.dismiss();
      },
    });
  };

  return (
    <View style={todoStyles.container}>
      {/* Bugungi vazifalar */}
      <ScrollView
        style={todoStyles.tasksWrapper}
        contentContainerStyle={{ paddingBottom: 140 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={todoStyles.sectionTitle}>Today's tasks</Text>

        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <View style={todoStyles.items}>
            {todos?.map((task, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => deleteTodo.mutate(task.id)}
              >
                <Task title={task.title} />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Yangi vazifa qo'shish */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={todoStyles.writeTaskWrapper}
      >
        <TextInput
          onChangeText={(val) => setTask(val)}
          value={task ?? ""}
          style={todoStyles.input}
          placeholder="Write a task"
        />
        <TouchableOpacity activeOpacity={1} onPress={handleAddTask}>
          <View style={todoStyles.addWrapper}>
            <Text style={todoStyles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
