import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard, ToastAndroid, Platform, Alert } from 'react-native';
import { fetchWeatherData } from '../utils/api';
import { WeatherData } from '../types/WeatherData';
import WeatherDisplay from '../components/WeatherDisplay';
// import Ionicons from 'react-native-vector-icons/Ionicons';

const WeatherScreen: React.FC = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState<WeatherData | null>(null);

    const handleFetchWeather = async () => {
        if(!city.trim()) {
          if(Platform.OS === 'android') {
            ToastAndroid.showWithGravity(
              'Please enter a valid city name',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
          } else {
            Alert.alert('Please enter a valid city name');
          }
          return;
        }

        const data = await fetchWeatherData(city);
        if(data) {
            setWeather(data);
            setCity('');
            Keyboard.dismiss();
        } else {
          if(Platform.OS === 'android') {
            ToastAndroid.showWithGravity(
              'Failed to fetch weather data. Try again later.',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
          } else {
            Alert.alert('Failed to fetch weather data. Try again later.');
          }
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

          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btn}
            >
              {/* <Ionicons name="location-sharp" size={20} color="#333" /> */}
              <Text style={styles.btnText}>Fetch Location</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btn}
              onPress={handleFetchWeather}
            >
              <Text style={styles.btnText}>Get Weather</Text>
            </TouchableOpacity>
          </View>
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
        backgroundColor: '#FFFAF1',
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
        backgroundColor: 'white',
        letterSpacing: 1,
    },
    placeholderText: {
        textAlign: 'center',
        color: '#666',
        marginTop: 10,
        letterSpacing: 1,
    },
    btnContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    btn: {
      borderRadius: 10,
      backgroundColor: 'salmon',
      padding: 10,
      width: '48.5%',
    },
    btnText: {
      textAlign: 'center',
      textTransform: 'uppercase',
      fontWeight: '600',
      letterSpacing: 1,
      color: '#333',
    },
});
