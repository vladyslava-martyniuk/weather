
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import style from "./DayForecast.module.css";

export default function WeatherHourlyChart({ city, apiKey }) {
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

        const chartData = data.list.slice(0, 8).map((item) => ({
          time: item.dt_txt.slice(11, 16),
          temp: Math.round(item.main.temp),
        }));

        setForecast(chartData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch forecast");
        setLoading(false);
      });
  }, [city, apiKey]);

  if (loading) return <p>Loading hourly forecast for {city}...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!forecast.length) return null;

  return (
    <section className={style.weatherHourlyChart}>
      <h3 className={style.chartTitle}>Hourly Forecast for {city}</h3>
      <LineChart
        width={600}
        height={250}
        data={forecast}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="time" axisLine={false} tickLine={false} />
        <YAxis
          tickFormatter={(v) => `${v}°`}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{ borderRadius: "12px", border: "none" }}
          formatter={(value) => `${value}°C`}
        />
        <Line
          type="monotone"
          dataKey="temp"
          stroke="#FFC107"
          strokeWidth={3}
          dot={{ r: 4 }}
          activeDot={{ r: 7 }}
          animationDuration={1500}
        />
      </LineChart>
    </section>
  );
}
