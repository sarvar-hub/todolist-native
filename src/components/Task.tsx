import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ITaskProps {
  title: string;
}

const Task = ({ title }: ITaskProps) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity style={styles.square} />
        <Text style={styles.itemText}>{title}</Text>
      </View>
      <View style={styles.circular} />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 15,
  },
  square: {
    height: 24,
    width: 24,
    backgroundColor: "#54BCF6",
    borderRadius: 5,
    opacity: 0.4,
  },
  itemText: {
    maxWidth: "80%",
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: "#54BCF6",
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default Task;
