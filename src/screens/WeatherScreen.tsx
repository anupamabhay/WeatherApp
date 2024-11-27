/* eslint-disable quotes */
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard, ToastAndroid, Platform, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import { fetchWeatherData } from '../utils/api';
import { WeatherData } from '../types/WeatherData';
import WeatherDisplay from '../components/WeatherDisplay';
import useLocation from '../utils/useLocation';
import Ionicons from 'react-native-vector-icons/Ionicons';

const WeatherScreen: React.FC = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const {userCity, fetchLocation, error} = useLocation();

    useEffect(() => {
      if(userCity) {
          setCity(userCity);
          if(Platform.OS === 'android') {
            ToastAndroid.showWithGravity(
              `Location fetched. Tap the 'WEATHER' button.`,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
          } else {
            Alert.alert(`Location fetched. Tap the 'WEATHER' button.`);
          }
      }
    }, [userCity]);

    const handleLocationPress = () => {
      fetchLocation();
      if(error){
        if(Platform.OS === 'android') {
          ToastAndroid.showWithGravity(
            error || 'Unable to fetch location',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        } else {
          Alert.alert('Failed to fetch location.');
        }
      }
    };

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
      <KeyboardAvoidingView
        // eslint-disable-next-line react-native/no-inline-styles
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View>
            <TextInput
              value={city}
              placeholder="Enter city"
              placeholderTextColor="#666"
              onChangeText={setCity}
              style={styles.input}
            />

            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={[styles.btn, styles.btnLeft]}
                onPress={handleLocationPress}
              >
                <Ionicons name="location-sharp" size={20} color="#222D41" />
                <Text style={[styles.btnText, styles.btnTextLeft]}>Location</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btn}
                onPress={handleFetchWeather}
              >
                <Ionicons name="cloud-download" size={20} color="white" />
                <Text style={styles.btnText}>Weather</Text>
              </TouchableOpacity>
            </View>
          </View>

          {weather ? (
            <WeatherDisplay data={weather} />
          ) : (
            <Text style={styles.placeholderText}>Enter a city to get weather data.</Text>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    );
};

export default WeatherScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#222D41',
        gap: 40,
    },
    input: {
        height: 40,
        borderRadius: 10,
        paddingHorizontal: 8,
        marginBottom: 10,
        color: '#666',
        backgroundColor: 'white',
        letterSpacing: 1,
    },
    placeholderText: {
        textAlign: 'center',
        color: '#BDBCBC',
        marginTop: 10,
        letterSpacing: 1,
    },
    btnContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 10,
    },
    btn: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: '#F9A825',
      paddingVertical: 10,
      gap: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    btnText: {
      textTransform: 'uppercase',
      fontWeight: '600',
      letterSpacing: 1,
      color: 'white',
    },
    btnLeft: {
      backgroundColor: 'rgba(191, 214, 222, 0.8)',
    },
    btnTextLeft: {
      color: '#222D41',
    },
});
