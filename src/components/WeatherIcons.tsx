import React from 'react';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// export const WeatherIcons = (condition: string): JSX.Element => {
//     switch (condition.toLowerCase()) {
//         case 'clear':
//             return <MaterialCommunityIcons name="weather-sunny" size={100} color="#FFD700" />;

//         case 'clouds':
//             return <MaterialCommunityIcons name="weather-cloudy" size={100} color="#B0C4DE" />;

//         case 'rain':
//             return <MaterialCommunityIcons name="weather-rainy" size={100} color="#1E90FF" />;

//         case 'thunderstorm':
//             return <MaterialCommunityIcons name="weather-lightning" size={100} color="#FFA500" />;

//         case 'snow':
//             return <MaterialCommunityIcons name="weather-snowy" size={100} color="#ADD8E6" />;

//         case 'mist':
//             return <MaterialCommunityIcons name="weather-fog" size={100} color="#778899" />;

//         case 'haze':
//             return <MaterialCommunityIcons name="weather-fog" size={100} color="#778899" />;

//         default:
//             return <MaterialCommunityIcons name="weather-partly-cloudy" size={100} color="#B0C4DE" />;
//     }
// };

import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const WeatherIcons = (condition: string): JSX.Element => {
    switch (condition.toLowerCase()) {
        case 'clear':
            return <FontAwesome name="sun-o" size={100} color="#FFD700" />;

        case 'clouds':
            return <FontAwesome name="cloud" size={100} color="#B0C4DE" />;

        case 'rain':
            return <FontAwesome name="tint" size={100} color="#1E90FF" />;

        case 'thunderstorm':
            return <FontAwesome name="bolt" size={100} color="#FFA500" />;

        case 'snow':
            return <FontAwesome name="snowflake-o" size={100} color="#ADD8E6" />;

        case 'mist':
            return <FontAwesome name="smog" size={100} color="#778899" />;

        case 'haze':
            return <FontAwesome name="smog" size={100} color="#778899" />;

        default:
            return <FontAwesome name="cloud" size={100} color="#B0C4DE" />;
    }
};
