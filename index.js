/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import {name as appName} from './app.json';
import WeatherScreen from './src/screens/WeatherScreen';

// AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => WeatherScreen);
