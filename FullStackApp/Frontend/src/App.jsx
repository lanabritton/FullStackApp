import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import WeatherPage from './components/WeatherPage';
import FavouritePlaces from './components/FavouritePlaces';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

import './bootstrap.min.css';

const App = () => {
    return (
        <Router>
            <Header />
            <SearchBar />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/weather" element={<WeatherPage />} />
                    <Route path="/favourite-places" element={<FavouritePlaces />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
};

const HomePage = () => {
    return (
        <div>
        </div>
    );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

export default App;
