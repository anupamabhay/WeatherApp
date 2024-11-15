import AsyncStorage from '@react-native-async-storage/async-storage';

// Cache expires in 15 minutes i.e. 15 * 60 * 1000 in milliseconds
export const CACHE_EXPIRY = 15 * 60 * 1000;

const CALLS_KEY = 'api-calls';
const CALLS_TIMESTAMP_KEY = 'api-calls-timestamp';

// 5 API calls allowed every 1 hour (in milliseconds)
const LIMIT_PERIOD = 1 * 60 * 60 * 1000;

// Function to get the number of API calls
export const getApiCalls = async(): Promise<number> => {
    const timestamp = await AsyncStorage.getItem(CALLS_TIMESTAMP_KEY);
    const calls = await AsyncStorage.getItem(CALLS_KEY);

    if(!timestamp || Date.now() - parseInt(timestamp, 10) > LIMIT_PERIOD) {
        await AsyncStorage.setItem(CALLS_TIMESTAMP_KEY, Date.now().toString());
        await AsyncStorage.setItem(CALLS_KEY, '1');
        return 1;
    }

    return parseInt(calls || '0', 10);
};

// Function to increment the number of API calls
export const incrementApiCalls = async(): Promise<void> => {
    const calls = await getApiCalls();
    await AsyncStorage.setItem(CALLS_KEY, (calls + 1).toString());
};
