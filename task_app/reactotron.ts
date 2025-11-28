import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // or from 'react-native' if using older versions
import { reactotronRedux } from 'reactotron-redux';

if (__DEV__) {
  Reactotron
    .setAsyncStorageHandler(AsyncStorage) // Crucial for AsyncStorage inspection
    .configure({
      name: 'YourAppName', // Give your app a name
      host: 'localhost', // Use your computer's IP address for physical devices
    })
    .useReactNative({
      asyncStorage: true, // Enable AsyncStorage monitoring
      networking: {
        ignoreUrls: /symbolicate/, // Ignore symbolication requests
      },
      editor: true,
      errors: { veto: () => false },
      overlay: true,
      devTools: true
    })
    .use(reactotronRedux())
    .connect();
  Reactotron.clear!(); // Clear Reactotron on app load
  console.log('Reactotron Configured');
}

export default Reactotron;