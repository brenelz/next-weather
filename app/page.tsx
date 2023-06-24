'use client';

import { FormEvent, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

type Temperature = {
  kelvin: number;
  celcius: number;
}

export default function Home() {
  const [cityName, setCityName] = useState<string>();
  const [tempUnit, setTempUnit] = useState('Celcius');
  const [temperature, setTemperature] = useState<Temperature>();

  const getTemperature = async (city: string) => {
    const result = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );

    const weather = await result.json();

    if (weather.cod !== 200) {
      throw new Error(weather.message);
    }

    setTemperature({
      kelvin: weather.main.temp,
      celcius: Math.round(weather.main.temp - 273.15)
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formElements = form.elements as typeof form.elements & {
      cityName: HTMLInputElement;
    };
    const cityName = formElements.cityName.value;

    if (!cityName) return;
    setCityName(cityName);
    getTemperature(cityName);

    form.reset();
    formElements.cityName.focus();
  };

  return (
    <>
      <h2>Weather</h2>
      <form onSubmit={handleSubmit}>
        <input name="cityName" placeholder="City name" />
        <button type="submit">
          Check Weather
        </button>
      </form>
      {temperature && (<><p>
        The current weather in <strong>{cityName}</strong> is:{' '}
        {tempUnit === 'Celcius' ? temperature.celcius : temperature.kelvin}
      </p>
        <p>
          <button onClick={() => {
            setTempUnit('Celcius');
          }}>Celcius</button>

          <button onClick={() => {
            setTempUnit('Kelvin');
          }}>Kelvin</button>
        </p>
      </>)}
    </>
  );
}
