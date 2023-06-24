import { getTemperature } from "./actions";
import Weather from "./Weather";

export default async function Home({ searchParams }: any) {
  const cityName = searchParams.city || '';
  const temperature = await getTemperature(cityName);

  return (
    <>
      <h2>Weather</h2>
      <Weather cityName={cityName} temperature={temperature} />
    </>
  );
}
