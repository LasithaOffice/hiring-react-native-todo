/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import {
  EdgeInsets,
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Main from './src/screens/Main';
import { COLORS } from './src/constants/colors';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={COLORS.WHITE} />
      <Main />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default App;
