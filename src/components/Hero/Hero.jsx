import { useState, useEffect } from "react";
import style from "./Hero.module.css";
import Container from "../Container/Container";
import WeatherCard from "../WeatherCard/WeatherCard";
import SearchDesk from "../../images/hero/hero__search__desk.svg";
import SearchTab from "../../images/hero/hero__search__tab.svg";
import SearchMob from "../../images/hero/hero__search__mob.svg";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export default function Hero() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");


  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);


  useEffect(() => {
    fetchWeather("Kyiv");
  }, []);


  const fetchWeather = async (cityName) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      if (!res.ok) throw new Error();
      const data = await res.json();
      setWeather(data);
      setError("");
    } catch {
      setError("City not found. Please enter the name in English.");
      setWeather(null);
    }
  };

  const handleSearch = () => {
    if (!city.trim()) return setError("Please enter a city");
    fetchWeather(city.trim());
    setCity("");
  };

    const addFavorite = (city) => {
    if (!favorites.includes(city.name)) setFavorites([...favorites, city.name]);
  };

  const removeFavorite = (cityName) => {
    setFavorites(favorites.filter((c) => c !== cityName));
  };

  const clearSearchResult = () => {
    setWeather(null);
    setError("");
  };


  const showHourlyForecast = (cityName) => alert(`Hourly forecast for ${cityName}`);
  const showDailyForecast = (cityName) => alert(`5-day forecast for ${cityName}`);

  return (
    <section className={style.hero}>
      <Container>
        <h1 className={style.hero__main__title}>Weather Dashboard</h1>

        {/* Пошук */}        <div className={style.search}>
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />

          <button onClick={handleSearch}>
            <picture>
              <source srcSet={SearchDesk} media="(min-width: 1024px)" />
              <source srcSet={SearchTab} media="(min-width: 768px)" />
              <img src={SearchMob} alt="Search" />
            </picture>
          </button>
        </div>
        {error && <p className={style.error}>{error}</p>}

       
        {weather && (
          <div className={style.cardsContainer}>
            {[1, 2, 3].map((i) => (
              <WeatherCard
                key={i}
                data={weather}
                isFavorite={favorites.includes(weather.name)}
                onAddFavorite={addFavorite}
                onRemoveFavorite={removeFavorite}
                onDelete={clearSearchResult}
                onShowHourly={showHourlyForecast}
                onShowDaily={showDailyForecast}
              />
            ))}
          </div>
        )}

       
      </Container>
    </section>
  );
}
