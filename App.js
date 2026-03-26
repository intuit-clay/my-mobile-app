import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const meetingTopics = [
    'Brainstorm new content',
    'Fix existing content',
    'Review content strategy',
    'Discuss content guidelines'
  ];

  const addTask = () => {
    if (inputText.trim()) {
      setTasks([...tasks, { id: Date.now(), text: inputText, completed: false }]);
      setInputText('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.contentWrapper}>
        <View style={styles.header}>
          <Text style={styles.title}>My Tasks</Text>
          <Text style={styles.subtitle}>{tasks.length} tasks</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add a new task..."
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={addTask}
          />
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bookingSection}>
          <Text style={styles.bookingTitle}>Book Time with Content Designer</Text>
          <View style={styles.bookingCard}>
            <Text style={styles.bookingLabel}>Select meeting topic:</Text>
            <TouchableOpacity 
              style={styles.dropdown}
              onPress={() => setShowDropdown(!showDropdown)}
            >
              <Text style={[styles.dropdownText, !selectedTopic && styles.placeholderText]}>
                {selectedTopic || 'Choose a topic...'}
              </Text>
              <Text style={styles.dropdownArrow}>{showDropdown ? '▲' : '▼'}</Text>
            </TouchableOpacity>
            
            {showDropdown && (
              <View style={styles.dropdownMenu}>
                {meetingTopics.map((topic, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dropdownItem,
                      index === meetingTopics.length - 1 && styles.dropdownItemLast
                    ]}
                    onPress={() => {
                      setSelectedTopic(topic);
                      setShowDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{topic}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {selectedTopic ? (
              <View style={styles.selectedTopicBox}>
                <Text style={styles.selectedTopicText}>
                  Selected: {selectedTopic}
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        <ScrollView style={styles.taskList}>
          {tasks.map(task => (
            <View key={task.id} style={styles.taskItem}>
              <TouchableOpacity 
                style={styles.taskContent}
                onPress={() => toggleTask(task.id)}
              >
                <View style={[styles.checkbox, task.completed && styles.checkboxCompleted]}>
                  {task.completed && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={[styles.taskText, task.completed && styles.taskTextCompleted]}>
                  {task.text}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(task.id)}>
                <Text style={styles.deleteButton}>✕</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 60,
    alignItems: 'center',
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 800,
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 16,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButton: {
    backgroundColor: '#007AFF',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '300',
  },
  taskList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  taskContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#007AFF',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteButton: {
    fontSize: 24,
    color: '#ff3b30',
    paddingHorizontal: 10,
  },
  bookingSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  bookingLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  dropdown: {
    backgroundColor: '#f9fafb',
    borderWidth: 2,
    borderColor: '#3b82f6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  placeholderText: {
    color: '#999',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#3b82f6',
    marginLeft: 8,
  },
  dropdownMenu: {
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  dropdownItemLast: {
    borderBottomWidth: 0,
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  selectedTopicBox: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#eff6ff',
    borderRadius: 8,
  },
  selectedTopicText: {
    color: '#1e40af',
    fontSize: 16,
    fontWeight: '600',
  },
});
