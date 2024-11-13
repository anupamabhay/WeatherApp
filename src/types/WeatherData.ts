// Defining types for weather data responses
export interface WeatherData {
    main: {
        temp: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
    name: string;
}
