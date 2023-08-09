import { StyleSheet } from 'react-native';

import { Text, View } from '@/Expo/Themed';
import { useAuth } from '../../context/AuthContext';
import React from 'react';

import { supabaseClient } from '@/lib/supabase';
import Button from '@/components/ui/Button';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>

      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
      <Button onPress={() => supabaseClient.auth.signOut()}>Sign out</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
