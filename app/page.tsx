import { revalidatePath } from "next/cache";
import { getTemperature } from "./actions";
import Temperature from "./Weather";
import { readFile, writeFile } from './utilities'

export default async function Home() {
  const { cityName } = JSON.parse(readFile('./app/database.json'));
  const temperature = await getTemperature(cityName);

  const handleSubmit = async (formData: FormData) => {
    'use server';
    const cityName = formData.get('cityName');
    writeFile('./app/database.json', JSON.stringify({ cityName }));
    revalidatePath('/');
  };

  return (
    <>
      <h2>Weather</h2>
      <form action={handleSubmit}>
        <input name="cityName" placeholder="City name" />
        <button type="submit">
          Check Weather
        </button>
      </form>
      {temperature && <Temperature temperature={temperature} cityName={cityName} />}
    </>
  );
}
