import React from 'react';
import { FaHeart } from 'react-icons/fa';

const AddToFavouritesButton = ({ city, onAddToFavourites }) => {
    const handleAddToFavourites = () => {
        onAddToFavourites(city);
    };

    return (
        <div style={{ marginTop: '30px' }}> 
            <button type="button" onClick={handleAddToFavourites} data-test-id="add-to-favourites-button">
                <FaHeart style={{ marginRight: '5px' }} /> {/* Heart icon */}
                Add to Favourites
            </button>
        </div>
    );
};

export default AddToFavouritesButton;
