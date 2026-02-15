import { useState, useEffect } from "react";
import style from "./Hero.module.css";
import Container from "../Container/Container";
import WeatherCard from "../WeatherCard/WeatherCard";
import SearchDesk from "../../images/hero/hero__search__desk.svg";
import SearchTab from "../../images/hero/hero__search__tab.svg";
import SearchMob from "../../images/hero/hero__search__mob.svg";
const apiKey = "fe80c4a0f8d5fcbbae93e1e73369700f"
export default function Hero({ city, setCity }) {
  const [input, setInput] = useState("");
  const [weatherList, setWeatherList] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");

  // Завантаження фаворитів
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Fetch при старті
  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const fetchWeather = async (cityName) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
      );
      if (!res.ok) throw new Error();
      const data = await res.json();

      const formattedWeather = {
        feels_like: Math.round(data.main.feels_like),
        temp_min: Math.round(data.main.temp_min),
        temp_max: Math.round(data.main.temp_max),
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        wind: data.wind.speed,
        visibility: data.visibility,
        name: data.name,
        sys: data.sys,
        weather: data.weather,
        main: data.main,
        dt: data.dt
      };

      setWeatherList(prev => {
        if (prev.some(w => w.name === formattedWeather.name)) {
          return prev; // не додаємо дублікати
        }
        return [...prev, formattedWeather];
      });

      setError("");
    } catch {
      setError("City not found. Please enter the name in English.");
    }
  };

  const handleSearch = () => {
    if (!input.trim()) return setError("Please enter a city");
    setCity(input.trim());
    setInput("");
  };

  const addFavorite = (city) => {
    if (!favorites.includes(city.name)) {
      setFavorites([...favorites, city.name]);
    }
  };

  const removeFavorite = (cityName) => {
    setFavorites(favorites.filter((c) => c !== cityName));
  };

  const deleteCity = (cityName) => {
    setWeatherList(prev => prev.filter(w => w.name !== cityName));
  };

  const showHourlyForecast = (cityName) =>
    alert(`Hourly forecast for ${cityName}`);

  const showDailyForecast = (cityName) =>
    alert(`5-day forecast for ${cityName}`);

  return (
    <section className={style.hero}>
      <Container>
        <h1 className={style.hero__main__title}>Weather Dashboard</h1>

        <p className={style.hero__text}>
          Create your personal list of favorite cities and always be aware of the weather.
        </p>

        <div className={style.hero__date}>
          <span>{new Date().toLocaleString("en-US", { month: "long", year: "numeric" })}</span>
          <span>
            {new Date().toLocaleString("en-US", { weekday: "long", day: "numeric" })}
          </span>
        </div>

        <div className={style.search}>
          <input
            type="text"
            placeholder="Enter city..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch}>
            <picture>
              <source srcSet={SearchDesk} media="(min-width:1024px)" />
              <source srcSet={SearchTab} media="(min-width:768px)" />
              <img src={SearchMob} alt="Search" />
            </picture>
          </button>
        </div>

        {error && <p className={style.error}>{error}</p>}

        <ul className={style.cardsContainer}>
          {weatherList.map((weather) => (
            <WeatherCard
              key={weather.name}
              data={weather}
              isFavorite={favorites.includes(weather.name)}
              onAddFavorite={addFavorite}
              onRemoveFavorite={removeFavorite}
              onDelete={() => deleteCity(weather.name)}
              onShowHourly={showHourlyForecast}
              onShowDaily={showDailyForecast}
            />
          ))}
        </ul>
      </Container>
    </section>
  );
}
