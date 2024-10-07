import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, View } from 'react-native';
import TaskInput from './components/TaskInput';
import TaskItem from './components/TaskItem';
import { loadTasks, saveTasks } from './utils/storage';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // New filter feature

  useEffect(() => {
    loadStoredTasks();
  }, []);

  const loadStoredTasks = async () => {
    const storedTasks = await loadTasks();
    if (storedTasks) {
      setTasks(storedTasks);
    }
  };

  const addTask = (taskTitle) => {
    setTasks((currentTasks) => {
      const newTask = { id: Date.now().toString(), title: taskTitle, completed: false };
      const updatedTasks = [...currentTasks, newTask];
      saveTasks(updatedTasks); // Persisting tasks
      return updatedTasks;
    });
  };

  const toggleComplete = (taskId) => {
    setTasks((currentTasks) => {
      const updatedTasks = currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      saveTasks(updatedTasks); // Persisting tasks
      return updatedTasks;
    });
  };

  const deleteTask = (taskId) => {
    setTasks((currentTasks) => {
      const updatedTasks = currentTasks.filter((task) => task.id !== taskId);
      saveTasks(updatedTasks); // Persisting tasks
      return updatedTasks;
    });
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <TaskInput onAddTask={addTask} />
      <View style={styles.filterContainer}>
        <Text onPress={() => setFilter('all')} style={styles.filterButton}>
          All
        </Text>
        <Text onPress={() => setFilter('completed')} style={styles.filterButton}>
          Completed
        </Text>
        <Text onPress={() => setFilter('incomplete')} style={styles.filterButton}>
          Incomplete
        </Text>
      </View>
      <FlatList
        data={filteredTasks}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggleComplete={() => toggleComplete(item.id)}
            onDelete={() => deleteTask(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  filterButton: {
    fontSize: 16,
    color: '#1e90ff',
  },
});

export default App;
