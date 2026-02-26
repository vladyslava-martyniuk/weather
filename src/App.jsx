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
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  
  const [city, setCity] = useState("Kyiv");
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherList, setWeatherList] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [
      { username: "Vlad", email: "vlad@example.com", password: "123456" },
      { username: "Anna", email: "anna@example.com", password: "password" },
      { username: "John", email: "john@example.com", password: "qwerty" },
    ];
  });

 
  useEffect(() => {
    const savedIsLogged = localStorage.getItem('isLogged');
    if (savedIsLogged === 'true') {
      setIsLogged(true);
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('isLogged', isLogged);
  }, [isLogged]);


  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  return (
    <>
      <Header 
        isLogged={isLogged} 
        setIsLogged={setIsLogged}
        users={users}
        setUsers={setUsers}
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