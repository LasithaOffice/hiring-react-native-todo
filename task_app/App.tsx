/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  EdgeInsets,
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Main from './src/screens/Main';
import { COLORS } from './src/constants/colors';
import { Provider } from 'react-redux';
import store from './src/redux/store';

require('./reactotron')

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider style={styles.container}>
        <StatusBar backgroundColor={COLORS.WHITE} translucent />
        <Main />
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default App;
