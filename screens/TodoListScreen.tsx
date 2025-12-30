import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';

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

  const [error, setError] = useState('');

  const handleAddOrEdit = () => {
    setError('');
    if (!title || !description) {
      setError('Veuillez remplir tous les champs.');
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.innerContainer}>
        <Image source={require('../assets/2.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Mes tâches</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <FlatList
          data={todos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={[styles.todoItem, item.completed && styles.completedItem]}>
              <TouchableOpacity onPress={() => handleToggleComplete(item.id)} style={styles.checkbox}>
                <Text style={{ color: item.completed ? '#fff' : '#aaa', fontWeight: 'bold', fontSize: 16 }}>{item.completed ? '✔' : ''}</Text>
              </TouchableOpacity>
              <View style={{ flex: 1 }}>
                <Text style={[styles.todoTitle, item.completed && styles.completedText]}>{item.title}</Text>
                <Text style={styles.todoDesc}>{item.description}</Text>
              </View>
              <TouchableOpacity style={styles.actionBtn} onPress={() => handleEdit(item)}>
                <Text style={styles.actionBtnText}>Éditer</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, styles.deleteBtn]} onPress={() => handleDelete(item.id)}>
                <Text style={[styles.actionBtnText, { color: '#fff' }]}>Suppr.</Text>
              </TouchableOpacity>
            </View>
          )}
          style={{ width: '100%', marginBottom: 10 }}
          contentContainerStyle={{ paddingBottom: 10 }}
        />
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Titre"
            placeholderTextColor="#aaa"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            placeholderTextColor="#aaa"
            value={description}
            onChangeText={setDescription}
          />
          <TouchableOpacity
            style={[styles.button, !title || !description ? styles.buttonDisabled : null]}
            onPress={handleAddOrEdit}
            disabled={!title || !description}
          >
            <Text style={styles.buttonText}>{editingId ? 'Modifier' : 'Ajouter'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6f8fa',
  },
  innerContainer: {
    width: '95%',
    maxWidth: 500,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
    color: '#222',
  },
  error: {
    color: '#d11a2a',
    marginBottom: 10,
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  completedItem: {
    backgroundColor: '#e6ffe6',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: '#007bff',
  },
  todoTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'green',
  },
  todoDesc: {
    color: '#555',
    fontSize: 14,
  },
  actionBtn: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 6,
  },
  actionBtnText: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  deleteBtn: {
    backgroundColor: '#d11a2a',
  },
  form: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 44,
    borderColor: '#e0e0e0',
    borderWidth: 1.5,
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 14,
    backgroundColor: '#f9f9f9',
    fontSize: 15,
    color: '#222',
  },
  button: {
    width: '100%',
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 2,
    shadowColor: '#007bff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonDisabled: {
    backgroundColor: '#a0c8fa',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

export default TodoListScreen;
