import { useState, useEffect } from "react";
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
  const defaultCity = "Kyiv";
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const [city, setCity] = useState(defaultCity);
  const [selectedCity, setSelectedCity] = useState(defaultCity);
  const [weatherList, setWeatherList] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers
      ? JSON.parse(savedUsers)
      : [
          { username: "Vlad", email: "vlad@example.com", password: "123456" },
          { username: "Anna", email: "anna@example.com", password: "password" },
          { username: "John", email: "john@example.com", password: "qwerty" },
        ];
  });


  useEffect(() => {
    if (currentUser) {
      const saved = localStorage.getItem(`weatherList_${currentUser}`);
      setWeatherList(saved ? JSON.parse(saved) : []);
    } else {
      setWeatherList([]); 
    }
  }, [currentUser]);


  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        `weatherList_${currentUser}`,
        JSON.stringify(weatherList)
      );
    }
  }, [weatherList, currentUser]);


  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  return (
    <>
      <Header
        isLogged={isLogged}
        setIsLogged={setIsLogged}
        users={users}
        setUsers={setUsers}
        setWeatherList={setWeatherList}
        setCurrentUser={setCurrentUser}
        setSelectedCity={setSelectedCity}
        defaultCity={defaultCity} // передаємо дефолтне місто
      />

      <main>
        <Hero
          city={city}
          setCity={setCity}
          setSelectedCity={setSelectedCity}
          apiKey={API_KEY}
          weatherList={weatherList}
          setWeatherList={setWeatherList}
        />

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