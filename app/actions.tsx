'use server';

const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export const getTemperature = async (city: string) => {
    const result = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );

    const weather = await result.json()

    if (weather.cod !== 200) {
        throw new Error(weather.message);
    }

    return ({
        kelvin: weather.main.temp,
        celcius: Math.round(weather.main.temp - 273.15)
    });
};