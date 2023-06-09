import React, {useState} from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Snackbar } from 'react-native-paper';
import AnimatedLottieView from 'lottie-react-native';

import pokemonAnimation from './pokeball-pokedex.json';

import * as S from './styles';
import {login} from '../../services/firebase';

export function Welcome() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const { navigate } = useNavigation();

  function handleNavigateToHome() {
    navigate('HomePage');
  }

  const handleLogin = async (email, password) => {
    try {
      const response = await login(email, password);
      if (response) {
        handleNavigateToHome();
      } else {
        setSnackbarVisible(true);
      }
    } catch (error) {
      setSnackbarVisible(true);
      console.error('Login error:', error);
    }
  };

  const handleSnackbarDismiss = () => {
    setSnackbarVisible(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <S.Container>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <S.Content>
          <S.IconContent>
            <AnimatedLottieView autoPlay source={pokemonAnimation} loop />
          </S.IconContent>

          <S.Title>Pokédex</S.Title>
          <S.SubTitle>Welcome to the Pokedex. Please login</S.SubTitle>
        </S.Content>

        <S.Bottom>
          <S.TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <S.TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <S.Button onPress={() => handleLogin(email, password)}>
            <S.ButtonText>Login</S.ButtonText>
          </S.Button>
        </S.Bottom>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={handleSnackbarDismiss}
          duration={3000}
          action={{
            label: 'Dismiss',
            onPress: handleSnackbarDismiss,
          }}
        >
          Invalid email or password
        </Snackbar>
        </ScrollView>
      </S.Container>
    </KeyboardAvoidingView>
  );
}
