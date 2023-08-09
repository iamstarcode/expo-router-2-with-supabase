import React from 'react';
import { useState } from 'react';
import { Alert } from 'react-native';
import { Box, Text, VStack, Icon } from 'native-base';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { MaterialIcons } from '@expo/vector-icons';
import { supabaseClient } from '@/lib/supabase';

export default function SignIn() {
  const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabaseClient.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }
  return (
    <Box justifyContent='center' flex='1' px='3'>
      <Text fontSize={24} textAlign={'center'} fontWeight={'bold'} mt={5}>
        {view == 'sign-in' ? 'Sign in' : 'Sign up'}
      </Text>

      <VStack space={4} mt={5}>
        <Input
          autoComplete='email'
          placeholder='Email'
          type='text'
          onChangeText={(text: string) => setEmail(text)}
          value={email}
        />
        <Input
          onChangeText={(text: string) => setPassword(text)}
          value={password}
          type={show ? 'text' : 'password'}
          placeholder='Password'
          autoCapitalize={'none'}
          InputRightElement={
            <Icon
              as={
                <MaterialIcons name={show ? 'visibility' : 'visibility-off'} />
              }
              size={5}
              mr='2'
              color='muted.400'
              onPress={() => setShow(!show)}
            />
          }
        />
        {view == 'sign-in' ? (
          <Button
            isLoading={loading}
            size='lg'
            onPress={() => signInWithEmail()}
          >
            Sign in
          </Button>
        ) : (
          <Button
            isLoading={loading}
            size='lg'
            onPress={() => signUpWithEmail()}
          >
            Sign up
          </Button>
        )}
      </VStack>
      <Text
        mt='2'
        textAlign='right'
        color='blue.500'
        onPress={() => setView(view == 'sign-in' ? 'sign-up' : 'sign-in')}
      >
        {view == 'sign-in' ? 'Sign in' : 'Sign up'}
      </Text>
    </Box>
  );
}
