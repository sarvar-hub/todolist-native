import { Platform } from "expo-modules-core";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Task from "./src/components/Task";
import { TASKS } from "./src/constants";

export default function App() {
  const [tasks, setTasks] = useState(TASKS);
  const [task, setTask] = useState("");

  const handleAddTask = () => {
    if (task) {
      setTasks((prev) => [...prev, { title: task }]);
      setTask("");
      Keyboard.dismiss();
    }
  };

  const completeTask = (index: number) => {
    let tasksCopy = [...tasks];
    tasksCopy.splice(index, 1);
    setTasks(tasksCopy);
  };

  return (
    <View style={styles.container}>
      {/* Today's Tasks */}
      <ScrollView
        style={styles.tasksWrapper}
        contentContainerStyle={{ paddingBottom: 140 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.sectionTitle}>Today's tasks</Text>

        <View style={styles.items}>
          {tasks.map((task, index) => (
            <TouchableOpacity key={index} onPress={() => completeTask(index)}>
              <Task title={task.title} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Write a task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          onChangeText={(val) => setTask(val)}
          value={task ?? ""}
          style={styles.input}
          placeholder="Write a task"
        />
        <TouchableOpacity activeOpacity={1} onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  items: {
    gap: 20,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    padding: 15,
    width: 250,
    backgroundColor: "#FFF",
    borderRadius: 60,
    // shadow for ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    // Shadow for Android
    elevation: 5,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    // shadow for ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    // Shadow for Android
    elevation: 5,
  },
  addText: {
    fontSize: 35,
    color: "#C0C0C0",
    textAlign: "center",
    lineHeight: 39,
  },
});
