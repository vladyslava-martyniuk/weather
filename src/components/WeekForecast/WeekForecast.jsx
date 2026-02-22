import React, { useState, useEffect } from "react";
import style from "./WeekForecast.module.css";
import Container from "../Container/Container";

export default function WeatherDailyList({ city, apiKey }) {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    setLoading(true);
    setError(null);

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod !== "200") {
          setError(data.message || "Error fetching forecast");
          setLoading(false);
          return;
        }

     
        const dailyData = data.list
          .filter((_, index) => index % 8 === 0)
          .slice(0, 8)
          .map((item) => ({
            id: item.dt,
            date: new Date(item.dt * 1000).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            }),
            max: Math.round(item.main.temp_max),
            min: Math.round(item.main.temp_min),
            description: item.weather[0].description,
            icon: item.weather[0].icon,
          }));

        setForecast(dailyData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch forecast");
        setLoading(false);
      });
  }, [city, apiKey]);

  if (loading) return <p>Loading daily forecast for {city}...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!forecast.length) return null;

  return (
    <section className={style.forecastBlock} id="weeklyForecast">
      <Container>
      <h3 className={style.title}>8-day Forecast for {city}</h3>

      {forecast.map((day) => (
        <div key={day.id} className={style.row}>
          <span className={style.date}>{day.date}</span>

          <div className={style.weatherInfo}>
            <img
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.description}
            />

            <span className={style.temp}>
              {day.max}/{day.min}°C
            </span>
          </div>

          <span className={style.desc}>{day.description}</span>
        </div>
      
      ))}  
      </Container>
    </section>
  );
}
