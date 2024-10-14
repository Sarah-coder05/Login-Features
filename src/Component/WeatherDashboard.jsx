import React, { useState, useEffect, useCallback } from 'react';
import './WeatherDashboard.css'
import { fetchWeather } from './api'; 

const WeatherDashboard = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(async (cityToSearch) => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchWeather(cityToSearch);
      setWeather(data);
      localStorage.setItem('lastSearchedCity', cityToSearch); 
    } catch (err) {
      setError('City not found');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const lastCity = localStorage.getItem('lastSearchedCity');
    if (lastCity) {
      setCity(lastCity);
      handleSearch(lastCity);
    }
  }, [handleSearch]);

  return (
    <div className="weather-dashboard">
      <h1 className="dashboard-title">Weather Dashboard</h1>
      
      <div className="search-container">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="city-input"
        />
        <button 
          onClick={() => handleSearch(city)} 
          disabled={!city} 
          className="search-button"
        >
          Search
        </button>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-info">
          <div className="weather-header">
            <h2 className="city-name">{weather.name}</h2>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
              className="weather-icon"
            />
          </div>

          <div className="weather-details">
            <p className="temperature">Temperature: {weather.main.temp} °C</p>
            <p className="humidity">Humidity: {weather.main.humidity}%</p>
            <p className="condition">Condition: {weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
