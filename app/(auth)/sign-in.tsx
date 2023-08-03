import { StyleSheet } from 'react-native';

import { Text, View } from '@/Expo/Themed';
import { Button, Input } from 'react-native-elements';
//import { Box } from 'native-base';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In njn</Text>
      <Input
        label='Email'
        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
        //onChangeText={(text) => setEmail(text)}
        //value={email}
        placeholder='email@address.com'
        autoCapitalize={'none'}
      />
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
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
