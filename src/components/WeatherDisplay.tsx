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
        fontSize: 24,
        fontWeight: 'bold',
    },
    temperature: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    weatherIcon: {
        width: 100,
        height: 100,
    },
    description: {
        fontSize: 18,
        color: '#555',
    },
});

export default WeatherDisplay;
