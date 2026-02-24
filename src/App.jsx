import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import WeatherMore from "./components/WeatherMore/WeatherMore";
import DayForecast from "./components/DayForecast/DayForecast";
import WeekForecast from "./components/WeekForecast/WeekForecast";
import PetStories from "./components/PetStories/PetStories";
import Slider from "./components/Slider/Slider";
import Footer from "./components/Footer/Footer";

function App() {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  
  const [city, setCity] = useState("Kyiv");
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherList, setWeatherList] = useState([]);
  const [isLogged, setIsLogged] = useState(false);

  return (
    <>
      <Header isLogged={isLogged} setIsLogged={setIsLogged} />

      <main>
        {/* Hero тільки пошук + картки */}
        <Hero
          city={city}
          setCity={setCity}
          setSelectedCity={setSelectedCity}
          apiKey={API_KEY}
          weatherList={weatherList}
          setWeatherList={setWeatherList}
        />

        {/* Секції під Hero */}
        {isLogged && (
          <div style={{ marginTop: "3rem" }}>
            <WeatherMore city={selectedCity || city} apiKey={API_KEY} />
            <DayForecast city={selectedCity || city} apiKey={API_KEY} />
            <WeekForecast city={selectedCity || city} apiKey={API_KEY} />
          </div>
        )}

        <PetStories />
        <Slider />
      </main>

      <Footer />
    </>
  );
}

export default App;

