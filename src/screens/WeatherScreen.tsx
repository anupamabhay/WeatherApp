import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { fetchWeatherData } from '../utils/api';
import { WeatherData } from '../types/WeatherData';
import WeatherDisplay from '../components/WeatherDisplay';

const WeatherScreen: React.FC = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState<WeatherData | null>(null);

    const handleFetchWeather = async () => {
        const data = await fetchWeatherData(city);
        if(data) {
            setWeather(data);
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
        backgroundColor: 'white',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 8,
        marginBottom: 10,
    },
    placeholderText: {
        textAlign: 'center',
        color: '#888',
        marginTop: 10,
    },
});
