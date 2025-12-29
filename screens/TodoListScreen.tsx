import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TextInput, Alert, TouchableOpacity, Image } from 'react-native';

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const initialTodos: Todo[] = [
  { id: '1', title: 'Première tâche', description: 'Ceci est une tâche exemple', completed: false },
  { id: '2', title: 'Tâche terminée', description: 'Celle-ci est complétée', completed: true },
];

const TodoListScreen = ({ navigation }: any) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddOrEdit = () => {
    if (!title || !description) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
    if (editingId) {
      setTodos(todos.map(todo => todo.id === editingId ? { ...todo, title, description } : todo));
      setEditingId(null);
    } else {
      setTodos([
        ...todos,
        { id: Date.now().toString(), title, description, completed: false },
      ]);
    }
    setTitle('');
    setDescription('');
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEdit = (todo: Todo) => {
    setTitle(todo.title);
    setDescription(todo.description);
    setEditingId(todo.id);
  };

  const handleToggleComplete = (id: string) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/2.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Mes tâches</Text>
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.todoItem, item.completed && styles.completedItem]}>
            <TouchableOpacity onPress={() => handleToggleComplete(item.id)} style={styles.checkbox}>
              <Text style={{ color: item.completed ? 'green' : '#aaa' }}>{item.completed ? '✔' : ''}</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Text style={[styles.todoTitle, item.completed && styles.completedText]}>{item.title}</Text>
              <Text style={styles.todoDesc}>{item.description}</Text>
            </View>
            <Button title="Éditer" onPress={() => handleEdit(item)} />
            <Button title="Supprimer" color="#d11a2a" onPress={() => handleDelete(item.id)} />
          </View>
        )}
        style={{ width: '100%' }}
      />
      <TextInput
        style={styles.input}
        placeholder="Titre"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title={editingId ? 'Modifier' : 'Ajouter'} onPress={handleAddOrEdit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '100%',
    backgroundColor: '#fafafa',
  },
  completedItem: {
    backgroundColor: '#e6ffe6',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#aaa',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'green',
  },
  todoDesc: {
    color: '#555',
    fontSize: 14,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
});

export default TodoListScreen;
