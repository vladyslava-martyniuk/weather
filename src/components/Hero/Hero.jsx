import { useState } from "react";
import style from "./Hero.module.css";
import Container from "../Container/Container";
import SearchDesk from "../../images/hero/hero__search__desk.svg";
import SearchTab from "../../images/hero/hero__search__tab.svg";
import SearchMob from "../../images/hero/hero__search__mob.svg";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export default function Hero() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");


  const now = new Date();
  const monthYear = now.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const weekday = now.toLocaleDateString("en-US", { weekday: "long" });
  const day = now.getDate();
  const getOrdinal = (n) => (n > 3 && n < 21 ? "th" : [,"st","nd","rd"][n % 10] || "th");

  const handleSearch = async () => {
    if (!city.trim()) {
      setError("Please enter a city");
      setWeather(null);
      return;
    }

    try {
      setError("");
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&units=metric&appid=${API_KEY}`
      );

      if (!res.ok) throw new Error();

      const data = await res.json();
      setWeather(data);
      setCity("");
    } catch {
      setError("City not found. Please enter the name in English.");
      setWeather(null);
    }
  };


  const getWeatherEmoji = (main) => {
    switch (main.toLowerCase()) {
      case "clear": return "☀️";
      case "clouds": return "☁️";
      case "rain": return "🌧️";
      case "drizzle": return "🌦️";
      case "thunderstorm": return "⛈️";
      case "snow": return "❄️";
      case "mist":
      case "fog": return "🌫️";
      default: return "🌡️";
    }
  };

  return (
    <section className={style.hero}>
      <Container>
        <h1 className={style.hero__main__title}>Weather dashboard</h1>
        <p className={style.hero__main__text}>
          Create your personal list of favorite cities and always be aware of the weather.
        </p>

        
        <div className={style.hero__main__date}>
          <p>{monthYear}</p>
          <p>{weekday}, {day}{getOrdinal(day)}</p>
        </div>

    
        <div className={style.hero__search}>
          <input
            type="text"
            placeholder="Search location..."
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

      
        {error && <p className={style.hero__error}>{error}</p>}

  
        {weather && (
          <div className={style.hero__weather_card}>
            <h2>{weather.name}</h2>
            <p >{getWeatherEmoji(weather.weather[0].main)}</p>
            <p>{Math.round(weather.main.temp)}°C</p>
            <p>{weather.weather[0].description}</p>
          </div>
        )}
      </Container>
    </section>
  );
}
