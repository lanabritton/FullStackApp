import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa'; // Import the map marker icon

const FavouritePlaces = () => {
    // State variable to store favourite places
    const [favouritePlaces, setFavouritePlaces] = useState([]);
    const navigate = useNavigate();

    // Load favourite places from local storage on component mount
    useEffect(() => {
        const storedFavourites = localStorage.getItem('favouritePlaces');
        if (storedFavourites) {
            setFavouritePlaces(JSON.parse(storedFavourites));
        }
    }, []);

    // Function to handle clicking on a favourite place, navigates to the weather page for that place
    const handleFavouritePlaceClick = (place) => {
        navigate(`/weather?city=${encodeURIComponent(place)}`);
    };

    // Function to handle removing a favourite place
    const handleRemoveFavourite = (place) => {
        const updatedFavourites = favouritePlaces.filter((favPlace) => favPlace !== place);
        setFavouritePlaces(updatedFavourites);
        localStorage.setItem('favouritePlaces', JSON.stringify(updatedFavourites));
    };

    // Function to capitalise the first letter of a string
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // Render the list of favourite places
    return (
        <div className="container">
            <h2 className="text-center mt-5 mb-4">Favourite Places</h2>
            <div className="row justify-content-center">
                {favouritePlaces.map((place, index) => (
                    <div key={index} className="col-md-6 col-lg-4 mb-3">
                        <div className="card">
                            <div className="card-body d-flex align-items-center justify-content-between">
                                <div>
                                    <FaMapMarkerAlt className="me-2" /> {/* Icon */}
                                    {/* Button to navigate to the weather page for the favourite place */}
                                    <button className="btn btn-link me-2" onClick={() => handleFavouritePlaceClick(place)}>
                                        {capitalizeFirstLetter(place)}
                                    </button>
                                </div>
                                <button className="btn btn-danger" onClick={() => handleRemoveFavourite(place)}>Remove</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavouritePlaces;
