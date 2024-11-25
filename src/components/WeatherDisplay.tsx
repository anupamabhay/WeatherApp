import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WeatherData } from '../types/WeatherData';
import WeatherIcons from './WeatherIcons';
import Feather from 'react-native-vector-icons/Feather';

interface WeatherDisplayProps {
    data: WeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({data}) => {
    const {main, weather, name, sys, wind, dt, clouds} = data;
    const weatherInfo = weather[0];

    const date = new Date(dt * 1000);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(date);

    const sunriseTime = new Date(sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    const sunsetTime = new Date(sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

    return (
        <View style={styles.container}>
            <View style={styles.city_container}>
                    <Text style={styles.city_text}>{name}, {sys.country}  •  </Text>
                    <Text style={styles.city_text}>{formattedDate}</Text>
            </View>

            <View style={styles.temp_container}>
                {/* eslint-disable-next-line react-native/no-inline-styles */}
                <Text style ={styles.temperature}>{main.temp}<Text style={{color: '#BDBCBC'}}>°C</Text></Text>

                <View style={styles.icon_container}>
                    <WeatherIcons condition={weatherInfo.main} sunrise={sys.sunrise} sunset={sys.sunset} localeTime={dt} />
                </View>
            </View>

            <View style={styles.card_container}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Sky</Text>
                    <Text style={styles.cardText}>{weatherInfo.description}</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Feels like</Text>
                    <Text style={styles.cardText}>{main.feels_like}°C</Text>
                </View>
            </View>

            <View style={styles.card_container}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>High</Text>
                    <Text style={styles.cardText}>{main.temp_max}°C</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Low</Text>
                    <Text style={styles.cardText}>{main.temp_min}°C</Text>
                </View>
            </View>

            <View style={styles.card_container}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Humidity</Text>
                    <Text style={styles.cardText}>{main.humidity}%</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Cloudiness</Text>
                    <Text style={styles.cardText}>{clouds.all}%</Text>
                </View>
            </View>

            <View style={styles.card_container}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Wind</Text>
                    <Text style={styles.cardText}>{wind.speed} km/h</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Pressure</Text>
                    <Text style={styles.cardText}>{main.pressure} mb</Text>
                </View>
            </View>

            <View style={[styles.card, styles.fullCard]}>
                <View style={styles.row}>
                    <Text style={styles.cardTitle}>Sunrise</Text>
                    <Text style={styles.cardText}>{sunriseTime}</Text>
                </View>

                <Feather name="sunrise" size={40} color="#F9A825" />

                <View style={[styles.row, styles.row2]}>
                    <Text style={styles.cardTitle}>Sunset</Text>
                    <Text style={styles.cardText}>{sunsetTime}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 10,
    },
    city_container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        color: 'white',
    },
    city_text: {
        color: '#FFF',
        fontSize: 15,
        letterSpacing: 1,
        fontWeight: 600,
    },
    temp_container: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        // borderColor: '#F9A825',
        marginBottom: 30,
        borderColor: 'rgba(191, 214, 222, 0.8)',
    },
    icon_container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    temperature: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#FFF',
        letterSpacing: 3,
    },
    card_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    card: {
        flexBasis: '48.5%',
        backgroundColor: '#2E445F',
        borderRadius: 10,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    fullCard: {
        flexBasis: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        // borderWidth: 1,
    },
    row: {
        alignItems: 'flex-start',
    },
    row2: {
        alignItems: 'flex-end',
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: 600,
        color: 'white',
        textAlign: 'center',
        letterSpacing: 1,
    },
    cardText: {
        fontSize: 15,
        fontWeight: 500,
        color: '#BDBCBC',
        letterSpacing: 1,
        textAlign: 'center',
        textTransform: 'capitalize',
    },
});

export default WeatherDisplay;
