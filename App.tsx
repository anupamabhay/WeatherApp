import React from 'react';
import WeatherScreen from './src/screens/WeatherScreen';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#FFFAF1"
        barStyle="dark-content"
      />
      <WeatherScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
