import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface WeatherIconsProps {
    condition: string,
    sunrise: number,
    sunset: number,
    localeTime: number,
}

const WeatherIcons: React.FC<WeatherIconsProps> = ({condition, sunrise, sunset, localeTime}) => {
    const isDay = localeTime >= sunrise && localeTime <= sunset;

    switch (condition.toLowerCase()) {
        case 'clear':
            return isDay ? (
                <Ionicons name="sunny" size={60} color="#F9A825" />
            ) : (
                <Ionicons name="moon" size={60} color="#F9A825" />
            );

        case 'clouds':
            return <Ionicons name="cloud" size={60} color="#B0C4DE" />;

        case 'rain':
            return <Ionicons name="rainy" size={60} color="#1E90FF" />;

        case 'thunderstorm':
            return <Ionicons name="thunderstorm" size={60} color="#FFA500" />;

        case 'snow':
            return <Ionicons name="snow" size={60} color="#ADD8E6" />;

        case 'mist':
        case 'haze':
        case 'fog':
            return <Ionicons name="cloudy" size={60} color="#778899" />;

        default:
            return <Ionicons name="partly-sunny" size={60} color="#B0C4DE" />;
    }
};

export default WeatherIcons;
