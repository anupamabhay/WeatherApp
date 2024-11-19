import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const WeatherIcons = (condition: string): JSX.Element => {
    switch (condition.toLowerCase()) {
        case 'clear':
            return <Ionicons name="sunny" size={100} color="salmon" />;

        case 'clouds':
            return <Ionicons name="cloud" size={100} color="#B0C4DE" />;

        case 'rain':
            return <Ionicons name="rainy" size={100} color="#1E90FF" />;

        case 'thunderstorm':
            return <Ionicons name="thunderstorm" size={100} color="#FFA500" />;

        case 'snow':
            return <Ionicons name="snow" size={100} color="#ADD8E6" />;

        case 'mist':
        case 'haze':
        case 'fog':
            return <Ionicons name="cloudy" size={100} color="#778899" />;

        default:
            return <Ionicons name="partly-sunny" size={100} color="#B0C4DE" />;
    }
};

export default WeatherIcons;
