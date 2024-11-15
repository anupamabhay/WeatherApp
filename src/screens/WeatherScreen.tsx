import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { fetchWeatherData } from '../utils/api';
import { WeatherData } from '../types/WeatherData';
import WeatherDisplay from '../components/WeatherDisplay';
import Toast from 'react-native-toast-message';

const WeatherScreen: React.FC = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState<WeatherData | null>(null);

    const handleFetchWeather = async () => {
        if(!city.trim()) {
          Toast.show({
            type: 'error',
            text1: 'Invalid input',
            text2: 'Please enter a valid city name',
            position: 'top',
          });
          return;
        }

        const data = await fetchWeatherData(city);
        if(data) {
            setWeather(data);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Couldn\'t fetch weather data',
            text2: 'Please try again later.',
            position: 'top',
          });
        }
    };

    return (
      <View style={styles.container}>
        <TextInput
          value={city}
          placeholder="Enter city"
          onChangeText={setCity}
          style={styles.input}
        />
        <Button title="Get Weather" onPress={handleFetchWeather} />

        {weather ? (
          <WeatherDisplay data={weather} />
        ) : (
          <Text  style={styles.placeholderText}>Enter a city to get weather data.</Text>
        )}
      </View>
    );
};

export default WeatherScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: 'black',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 8,
        marginBottom: 10,
        color: 'white',
    },
    placeholderText: {
        textAlign: 'center',
        color: '#888',
        marginTop: 10,
    },
});
