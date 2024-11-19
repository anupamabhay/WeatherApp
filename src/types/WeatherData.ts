// Defining types for weather data responses
export interface WeatherData {
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
        temp_max: number;
        temp_min: number;
    };
    weather: {
        main: string; // weather status name: Clear, etc.
        description: string; // weather status desc: clear sky, cloudy, etc.
        icon: string; // weather icon returned by API
    }[];
    name: string; // name of the city
    sys: {
        country: string;
    };
    wind: {
        gust: number;
        speed: number;
    };
}
