import { useState } from "react";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import WeatherMore from "./components/WeatherMore/WeatherMore";
import DayForecast from "./components/DayForecast/DayForecast";
import WeekForecast from "./components/WeekForecast/WeekForecast";
import PetStories from "./components/PetStories/PetStories";
import Slider from "./components/Slider/Slider";
import Footer from "./components/Footer/Footer";


function App() {
  const [city, setCity] = useState("Kyiv");
  const [isLogged, setIsLogged] = useState(false);
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  return (
    <>
      <Header setIsLogged={setIsLogged} />

      <main>
        <Hero city={city} setCity={setCity} apiKey={API_KEY} />

        {isLogged && <WeatherMore city={city} apiKey={API_KEY} />}
        {isLogged && <DayForecast city={city} apiKey={API_KEY} />}
        {isLogged && <WeekForecast city={city} apiKey={API_KEY} />}

        <PetStories />
        <Slider />
      </main>

      <Footer />
    </>
  );
}

export default App;




