/*import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

const SearchBar = () => {
    const [input, setInput] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    const fetchData = (value) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=51a4ea36f06c20dd1e3a08300fa2e5b8`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                return response.json();
            })
            .then(data => {
                navigate(`/weather?city=${value}`);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    };

    const handleChange = (event) => {
        const { value } = event.target;
        setInput(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchData(input);
    };

    if (!isHomePage) {
        return null; 
    }

    return (
        <div className="input-wrapper">
            <form onSubmit={handleSubmit}>
                <FaSearch id="search-icon" />
                <input
                    placeholder="Search for a place..."
                    value={input}
                    onChange={handleChange}
                />
            </form>
        </div>
    );
};

export default SearchBar; */

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

const SearchBar = () => {
    const [input, setInput] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    const handleSearch = async () => {
        if (!input.trim()) return; // Don't search if input is empty or only contains whitespace

        // Check if the input is a valid city name
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=51a4ea36f06c20dd1e3a08300fa2e5b8`);
        if (weatherResponse.ok) {
            const weatherData = await weatherResponse.json();
            navigate(`/weather?city=${input}`);
        } else {
            // If the input is not a valid city name, navigate to the WeatherPage with the location query parameter
            navigate(`/weather?location=${input}`);
        }
    };

    const handleChange = (event) => {
        setInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSearch();
    };

    if (!isHomePage) {
        return null; // If not on the homepage, don't render the search bar
    }

    return (
        <div className="input-wrapper">
            <form onSubmit={handleSubmit}>
                <FaSearch id="search-icon" onClick={handleSearch} />
                <input
                    placeholder="Search for a place..."
                    value={input}
                    onChange={handleChange}
                />
            </form>
        </div>
    );
};

export default SearchBar;
