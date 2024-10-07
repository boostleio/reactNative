import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const TaskItem = ({ task, onToggleComplete, onDelete }) => {
  return (
    <View style={styles.taskItem}>
      <TouchableOpacity onPress={onToggleComplete}>
        <Text style={[styles.taskTitle, task.completed && styles.completedTask]}>
          {task.title}
        </Text>
      </TouchableOpacity>
      <Button title="Delete" onPress={onDelete} />
    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  taskTitle: {
    fontSize: 16,
  },
  completedTask: {
    textDecorationLine: 'line-through', // Bug fix: Visual indication for completed task
    color: '#bbb',
  },
});

export default TaskItem;
