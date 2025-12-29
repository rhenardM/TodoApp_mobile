import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TextInput, Alert, Image } from 'react-native';

interface UserData {
  id: string;
  name: string;
  email: string;
}

const initialData: UserData[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
];

const UserCrudScreen = ({ navigation }: any) => {
  const [users, setUsers] = useState<UserData[]>(initialData);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleAdd = () => {
    if (!name || !email) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
    setUsers([...users, { id: Date.now().toString(), name, email }]);
    setName('');
    setEmail('');
  };

  const handleDelete = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/2.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Mes données utilisateur</Text>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text>{item.name} ({item.email})</Text>
            <Button title="Supprimer" color="#d11a2a" onPress={() => handleDelete(item.id)} />
          </View>
        )}
        style={{ width: '100%' }}
      />
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button title="Ajouter" onPress={handleAdd} />
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
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '100%',
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

export default UserCrudScreen;
