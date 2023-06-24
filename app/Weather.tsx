'use client';

import { useState } from "react";

type Temperature = {
    kelvin: number;
    celcius: number;
}

export default function Temperature({ temperature, cityName }: { temperature: Temperature, cityName: string }) {
    const [tempUnit, setTempUnit] = useState('Celcius');

    return (
        <>
            <p>
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
        </>
    );
}
