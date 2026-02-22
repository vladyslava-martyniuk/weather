import style from "./WeatherCard.module.css";

export default function WeatherCard({
  data,
  isFavorite,
  onAddFavorite,
  onRemoveFavorite,
  onDelete,
  onSelectCity, // функція для оновлення активного міста
  activeCity
}) {
  const time = new Date(data.dt * 1000).getHours() + ":00";

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

  const isActive = activeCity === data.name;

  return (
    <div className={`${style.card} ${isActive ? style.activeCard : ""}`}>
      <h2>{data.name}</h2>
      <p className={style.country}>Country: {data.sys.country}</p>

      <p>
        <span className={style.weatherEmoji}>
          {getWeatherEmoji(data.weather[0].main)}
        </span>
        <span>{data.weather[0].description}</span>
      </p>

      <p className={style.temperature}>
        🌡 {Math.round(data.main.temp)}°C
      </p>

      <p>🕒 {time}</p>

      <div className={style.buttons}>
        <button
          onClick={() =>
            isFavorite ? onRemoveFavorite(data.name) : onAddFavorite(data)
          }
          className={`${style.heart} ${
            isFavorite ? style.favActive : style.favInactive
          }`}
        >
          ❤️
        </button>
      
        <button onClick={() => onDelete(data.id)}>🗑 </button>

    
        <button onClick={() => onSelectCity(data.name)}>⭐</button>
      </div>
    </div>
  );
}
