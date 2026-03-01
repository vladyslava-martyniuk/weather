import { useState, useEffect } from "react";
import style from "./WeatherMore.module.css";
import Container from "../Container/Container";
import TemperatureDesk from "../../images/weather-more/weather-more_temperature_desk.png";
import TemperatureTab from "../../images/weather-more/weather-more_temperature_tab.png";
import CloudDesk from "../../images/weather-more/weather-more_cloud_desk.png";
import CloudTab from "../../images/weather-more/weather-more_cloud_tab.png";
import WindDesk from "../../images/weather-more/weather-more_wind_desk.png";
import WindTab from "../../images/weather-more/weather-more_wind_tab.png";
import ShowDesk from "../../images/weather-more/weather-more_show_desk.png";
import ShowTab from "../../images/weather-more/weather-more_show_tab.png";
import PressureDesk from "../../images/weather-more/weather-more_pressure_desk.png";
import PressureTab from "../../images/weather-more/weather-more_pressure_tab.png";

export default function WeatherMore({ city, apiKey }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city || !apiKey) return;

    setLoading(true);
    setError(null);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod !== 200) {
          setError(data.message || "Error fetching weather");
          setLoading(false);
          return;
        }

        setWeather({
          feels_like: Math.round(data.main.feels_like),
          temp_min: Math.round(data.main.temp_min),
          temp_max: Math.round(data.main.temp_max),
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          wind: data.wind.speed,
          visibility: data.visibility
        });
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch weather");
        setLoading(false);
      });
  }, [city, apiKey]);

  if (loading) return <p>Loading weather for {city}...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!weather) return null;

  const { feels_like, temp_min, temp_max, humidity, pressure, wind, visibility } =
    weather;

  return (
    <section className={style.weatherMore}id="menu">
      <Container>
        <ul className={style.weather__list}>
          <li className={style.weather__item}>
            <p className={style.weather__text}>Feels like</p>
            <h3 className={style.weather__value}>{feels_like}°C</h3>
            <picture>
              <source srcSet={TemperatureDesk} media="(min-width:1024px)" />
              <source srcSet={TemperatureTab} media="(min-width:768px)" />
              <img src={TemperatureTab} alt="Temperature" />
            </picture>
          </li>
          <li className={style.weather__item}>
            <p className={style.weather__text}>Min °C</p>
            <h3 className={style.weather__value}>{temp_min}°C</h3>
            <p className={style.weather__text}>Max °C</p>
            <h3 className={style.weather__value}>{temp_max}°C</h3>
          </li>
          <li className={style.weather__item}>
            <p className={style.weather__text}>Humidity</p>
            <h3 className={style.weather__value}>{humidity}%</h3>
            <picture>
              <source srcSet={CloudDesk} media="(min-width:1024px)" />
              <source srcSet={CloudTab} media="(min-width:768px)" />
              <img src={CloudTab} alt="Cloud" />
            </picture>
          </li>
          <li className={style.weather__item}>
            <p className={style.weather__text}>Pressure</p>
            <h3 className={style.weather__value}>{pressure} Pa</h3>
            <picture>
              <source srcSet={PressureDesk} media="(min-width:1024px)" />
              <source srcSet={PressureTab} media="(min-width:768px)" />
              <img src={PressureTab} alt="Pressure" />
            </picture>
          </li>
          <li className={style.weather__item}>
            <p className={style.weather__text}>Wind speed</p>
            <h3 className={style.weather__value}>{wind} m/s</h3>
            <picture>
              <source srcSet={WindDesk} media="(min-width:1024px)" />
              <source srcSet={WindTab} media="(min-width:768px)" />
              <img src={WindTab} alt="Wind" />
            </picture>
          </li>
          <li className={style.weather__item}>
            <p className={style.weather__text}>Visibility</p>
            <h3 className={style.weather__value}>{visibility}</h3>
            <picture>
              <source srcSet={ShowDesk} media="(min-width:1024px)" />
              <source srcSet={ShowTab} media="(min-width:768px)" />
              <img src={ShowTab} alt="Visibility" />
            </picture>
          </li>
        </ul>
      </Container>
    </section>
  );
}
