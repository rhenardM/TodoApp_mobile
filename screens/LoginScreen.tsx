import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { login as apiLogin, setToken } from '../api';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    if (email === '' || password === '') {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    setLoading(true);
    try {
      const data = await apiLogin(email, password);
      setToken(data.token);
      navigation.navigate('TodoList');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Identifiants invalides ou erreur serveur.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.innerContainer}>
        <Image source={require('../assets/2.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Connexion</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Connexion...' : 'Se connecter'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation?.navigate('Register')}>
          <Text style={styles.link}>Créer un compte</Text>
        </TouchableOpacity>
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
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 18,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 18,
    color: '#222',
  },
  error: {
    color: '#d11a2a',
    marginBottom: 12,
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: '#e0e0e0',
    borderWidth: 1.5,
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 14,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
    color: '#222',
  },
  button: {
    width: '100%',
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 8,
    shadowColor: '#007bff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonDisabled: {
    backgroundColor: '#a0c8fa',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 0.5,
  },
  link: {
    color: '#007bff',
    marginTop: 12,
    textDecorationLine: 'underline',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default LoginScreen;
