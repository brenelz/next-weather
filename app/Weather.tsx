'use client';

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type Temperature = {
    kelvin: number;
    celcius: number;
}

export default function Weather({ temperature, cityName }: { temperature?: Temperature, cityName: string }) {
    const router = useRouter();

    const [tempUnit, setTempUnit] = useState('Celcius');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const form = e.currentTarget as HTMLFormElement;
        const formElements = form.elements as typeof form.elements & {
            cityName: HTMLInputElement;
        };
        const cityName = formElements.cityName.value;

        router.push('/?city=' + cityName)

        form.reset();
        formElements.cityName.focus();
    };

    return (
        <>
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
