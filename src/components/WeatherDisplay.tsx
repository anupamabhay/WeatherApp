import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { WeatherData } from '../types/WeatherData';

interface WeatherDisplayProps {
    data: WeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({data}) => {
    const {main, weather, name} = data;
    const weatherInfo = weather[0];

    return (
        <View style={styles.container}>
            <Text style={styles.city}>City: {name}</Text>
            <Text style={styles.temperature}>Temperature: {main.temp}°C</Text>
            <Image
                source={{
                    uri: `https://openweathermap.org/img/w/${weatherInfo.icon}.png`,
                }}
                style={styles.weatherIcon}
            />
            <Text  style={styles.description}>Status: {weatherInfo.description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
    },
    city: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#666',
        letterSpacing: 1,
    },
    temperature: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#666',
        letterSpacing: 1,
    },
    weatherIcon: {
        width: 50,
        height: 50,
    },
    description: {
        fontSize: 18,
        color: '#888',
        letterSpacing: 1,
        textTransform: 'capitalize',
    },
});

export default WeatherDisplay;
