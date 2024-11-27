import Geolocation from '@react-native-community/geolocation';
import { useState } from 'react';
import { Alert, PermissionsAndroid, Platform, ToastAndroid } from 'react-native';
import { GOOGLE_GEOLOCATION_API_KEY } from '@env';

const useLocation = () => {
    const [location, setLocation] = useState<{latitude: number; longitude: number} | null>(null);
    const [userCity, setUserCity] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const requestPermission = async () => {
        try {
            if(Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Access Required',
                        message: 'This app needs to access your location',
                        buttonNeutral: 'Ask Me Late',
                        buttonPositive: 'OK',
                        buttonNegative: 'Cancel',
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            }
        } catch (err) {
            setError('Permission denied');
            return false;
        }
    };

    const fetchLocation = async () => {
        if(Platform.OS === 'android') {
            ToastAndroid.showWithGravity(
              'Fetching user location',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
          } else {
            Alert.alert('Fetching user location');
        }

        const hasPermission = await requestPermission();
        if(!hasPermission) {
            setError('Location permission not granted');
            console.log('Permission not granted!'); // can delete this
            return;
        }

        console.log('Attemting to fetch location'); // can delete this

        Geolocation.getCurrentPosition(
            position => {
                console.log('Position: ', position); // can delete this
                const {latitude, longitude} = position.coords;
                setLocation({latitude, longitude});
                fetchCityName(latitude, longitude);
            },
            err => {
                if(err.code === 1 || err.code === 3 || err.message.includes('timeout')) {
                    console.log('Falling back to coarse location...');
                    fetchCoarseLocation();
                } else {
                    setError('Failed to fetch location');
                }
            },
            {enableHighAccuracy: true, timeout: 10000, maximumAge: 10000}
        );
    };

    const fetchCoarseLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                const {latitude, longitude} = position.coords;
                setLocation({latitude, longitude});
                fetchCityName(latitude, longitude);
            },
            err => {
                setError('Failed to fetch coarse location');
                console.log(err.message);
            },
            {enableHighAccuracy: false, timeout: 10000, maximumAge: 10000}
        );
    };

    const fetchCityName = async (latitude: number, longitude: number) => {
        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_GEOLOCATION_API_KEY}`);

            const data = await response.json();

            if(data.results.length > 0) {
                const cityResult = data.results.find((result: any) =>
                    result.types.includes('locality')
                );
                if(cityResult) {
                    const cityName = cityResult.address_components[0].long_name;
                    console.log('city name: ', cityName); // can delete this
                    setUserCity(cityName);
                }
            }
        } catch (err) {
            setError('Failed to fetch city name');
        }
    };

    return {location, userCity, error, fetchLocation};
};

export default useLocation;
