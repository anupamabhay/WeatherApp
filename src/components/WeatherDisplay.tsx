import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WeatherData } from '../types/WeatherData';
import WeatherIcons from './WeatherIcons';


interface WeatherDisplayProps {
    data: WeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({data}) => {
    const {main, weather, name, sys, wind} = data;
    const weatherInfo = weather[0];

    return (
        <View style={styles.container}>
            <Text style={styles.city}>{name}, {sys.country}</Text>

            <View style={styles.temp_details_container}>
                <View style={styles.left_container}>
                    <Text style={styles.temperature}>{main.temp}°C</Text>

                    <View style={styles.temp_range}>
                        <Text style={styles.temp_range_text}>H: {main.temp_max}°C | L: {main.temp_min}°C</Text>
                    </View>

                    <Text style={styles.description}>{weatherInfo.description}</Text>
                </View>

                <View style={styles.right_container}>
                    {WeatherIcons(weatherInfo.main)}
                </View>
            </View>

            <View style={styles.extra_details_container}>
                <Text style={styles.extra_text}>
                    {main.humidity && `Humidity: ${main.humidity}%`} {wind.speed && `| Wind: ${wind.speed}`} {wind.gust && `| Gust: ${wind.gust}`}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 5,
    },
    city: {
        fontSize: 16,
        fontWeight: '500',
        color: '#666',
        letterSpacing: 1,
    },
    temp_details_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    left_container: {
        width: '60%',
        gap: 5,
    },
    right_container: {
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    temperature: {
        fontSize: 45,
        fontWeight: 'bold',
        color: '#555',
        letterSpacing: 1,
    },
    weatherIcon: {
        width: 100,
        height: 100,
    },
    description: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
        letterSpacing: 1,
        textTransform: 'capitalize',
    },
    temp_range: {
        flexDirection: 'row',
        gap: 10,
    },
    temp_range_text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
        letterSpacing: 1,
    },
    extra_details_container: {
        gap: 5,
    },
    extra_text: {
        fontSize: 16,
        fontWeight: '500',
        color: '#666',
        letterSpacing: 1,
        textTransform: 'capitalize',
    },
});

export default WeatherDisplay;
