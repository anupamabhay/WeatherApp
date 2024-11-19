import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
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
            setCity('');
            Keyboard.dismiss();
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
        <View>
          <TextInput
            value={city}
            placeholder="Location"
            placeholderTextColor="#666"
            onChangeText={setCity}
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.btn}
            onPress={handleFetchWeather}
          >
            <Text style={styles.btnText}>Get Weather</Text>
          </TouchableOpacity>
        </View>

        {weather ? (
          <WeatherDisplay data={weather} />
        ) : (
          <Text style={styles.placeholderText}>Enter a city to get weather data.</Text>
        )}
      </View>
    );
};

export default WeatherScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white',
        gap: 40,
    },
    input: {
        height: 40,
        borderColor: '#666',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 8,
        marginBottom: 10,
        color: '#666',
        letterSpacing: 1,
    },
    placeholderText: {
        textAlign: 'center',
        color: '#666',
        marginTop: 10,
        letterSpacing: 1,
    },
    btn: {
      borderRadius: 10,
      backgroundColor: 'salmon',
      padding: 10,
    },
    btnText: {
      textAlign: 'center',
      textTransform: 'uppercase',
      fontWeight: '600',
      letterSpacing: 1,
      color: '#333',
    },
});
