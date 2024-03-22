import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './WeatherPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddToFavouritesButton from './AddToFavouritesButton'; 
import Map from './MapComponent'; 

const WeatherPage = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [center, setCenter] = useState({ lon: -0.1278, lat: 51.5074 }); // Default center coordinates for London
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const city = queryParams.get('city');
    const [favouritePlaces, setFavouritePlaces] = useState([]); // Corrected spelling

    useEffect(() => {
        const fetchWeatherAndForecast = async () => {
            try {
                const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=51a4ea36f06c20dd1e3a08300fa2e5b8`);
                if (!weatherResponse.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                const weatherData = await weatherResponse.json();
                setWeatherData(weatherData);

                const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=51a4ea36f06c20dd1e3a08300fa2e5b8`);
                if (!forecastResponse.ok) {
                    throw new Error('Failed to fetch forecast data');
                }
                const forecastData = await forecastResponse.json();
                setForecastData(forecastData);

                // Fetch coordinates for the searched city
                const coordinatesResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=51a4ea36f06c20dd1e3a08300fa2e5b8`);
                if (coordinatesResponse.ok) {
                    const coordinatesData = await coordinatesResponse.json();
                    setCenter({ lon: coordinatesData.coord.lon, lat: coordinatesData.coord.lat });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (city) {
            fetchWeatherAndForecast();
        }
    }, [city]);

    // Handle adding city to favorites
    const addToFavourites = () => { 
        if (city && !favouritePlaces.includes(city)) {
            setFavouritePlaces(prevFavouritePlaces => { 
                const updatedFavourites = [...prevFavouritePlaces, city];
                localStorage.setItem('favouritePlaces', JSON.stringify(updatedFavourites));
                return updatedFavourites; // Return the updated state
            });
        }
    };
    
    const renderWeather = () => {
        if (!weatherData) {
            return <div data-test-id="weather-data">Loading current weather...</div>;
        }
    
        const { main, weather } = weatherData;
        const temperatureCelsius = Math.round(main.temp - 273.15);
        const weatherDescription = weather[0].description;
        const weatherIcon = weather[0].icon;
    
        return (
            <div className="weather-box" data-test-id="weather-data">
                <h2>Weather in {city.charAt(0).toUpperCase() + city.slice(1)}</h2>
                <div className="weather-info">
                    <div className="weather-icon">
                        <img src={`http://openweathermap.org/img/wn/${weatherIcon}.png`} alt="Weather Icon" />
                    </div>
                    <div>Temperature: {temperatureCelsius}°C</div>
                    <div>Weather: {weatherDescription}</div>
                    <AddToFavouritesButton city={city} onAddToFavourites={addToFavourites} data-testid="add-to-favourites-button" /> 
                </div>
            </div>
        );
    };

    // Load favourite places from local storage
    useEffect(() => {
        const storedFavourites = localStorage.getItem('favouritePlaces');
        if (storedFavourites) {
            setFavouritePlaces(JSON.parse(storedFavourites)); 
        }
    }, []);

    return (
        <div className="weather-page container">
            <div className="row">
                <div className="col-lg-6 col-md-12 mb-3 mb-lg-0">
                    {renderWeather()}
                </div>
                <div className="col-lg-6 col-md-12">
                    {weatherData && <Map center={center} />} 
                </div>
            </div>
            {forecastData && (
                <div className="forecast-container row justify-content-evenly">
                    {forecastData.list.filter((item, index) => index % 8 === 0).slice(0, 5).map((item, index) => (
                        <div key={index} className="forecast-box col-md-2 g-4 col-6" style={{ flex: 1 }}>
                            <h3>Forecast for {new Date(item.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long' })}</h3>
                            <img
                                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                                alt="Weather Icon"
                                className="forecast-icon"
                            />
                            <div>Date: {new Date(item.dt * 1000).toLocaleDateString('en-GB')}</div>
                            <div>Temperature: {Math.round(item.main.temp - 273.15)}°C</div>
                            <div>Weather: {item.weather[0].description}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WeatherPage;
