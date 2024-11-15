import React from 'react';
import WeatherScreen from './src/screens/WeatherScreen';
import Toast from 'react-native-toast-message';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
      />
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
