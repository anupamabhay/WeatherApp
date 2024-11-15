import React from 'react';
import WeatherScreen from './src/screens/WeatherScreen';
import Toast from 'react-native-toast-message';
import { SafeAreaView, StyleSheet } from 'react-native';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <WeatherScreen />
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
