// /* eslint-disable radix */
import axios, { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WeatherData } from '../types/WeatherData';
import { WEATHER_API_KEY } from '@env';
import { incrementApiCalls, getApiCalls, CACHE_EXPIRY } from './cache';

// URL for API call
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherData = async (city: string): Promise<WeatherData | null> => {
    const encodedCity = encodeURIComponent(city.trim());
    const cacheKey = `weather-${encodedCity}`;
    const cachedData = await AsyncStorage.getItem(cacheKey);
    const cachedTime = await AsyncStorage.getItem(`${cacheKey}-time`);

    if(cachedData && cachedTime && Date.now() - parseInt(cachedTime, 10) < CACHE_EXPIRY) {
        return JSON.parse(cachedData) as WeatherData;
    }

    const calls = await getApiCalls();
    if(calls > 100) {
        console.warn('API call limit reached! Try again later.');
        return null;
    }

    try {
        // Sending the request and getting the response
        const response: AxiosResponse<WeatherData> = await axios.get(`${API_URL}?q=${encodedCity}&appid=${WEATHER_API_KEY}&units=metric`);

        const weatherData: WeatherData = response.data;

        await AsyncStorage.setItem(cacheKey, JSON.stringify(weatherData));
        await AsyncStorage.setItem(`${cacheKey}-time`, Date.now().toString());
        await incrementApiCalls();

        return weatherData;

    } catch (error) {
        console.error('Error fetching weather data', error);
        return null;
    }
};
