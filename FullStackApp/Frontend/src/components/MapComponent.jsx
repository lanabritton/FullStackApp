import React, { useRef, useEffect, useState } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import "@tomtom-international/web-sdk-maps/dist/maps.css";

const Map = ({ center }) => {
    const mapElement = useRef(null); // Create a ref for the map container
    const [map, setMap] = useState(null); // State to store the map object

    useEffect(() => {
        if (!mapElement.current || !center) return; // Ensure the map element ref and center are available

        try {
            // Initialize the map using the TomTom Maps SDK
            const initializedMap = tt.map({
                key: "h7uMEanhP2pyWACvgxuZs8Q07EiK9wLC", // Replace with your actual TomTom Maps API key
                container: mapElement.current, // Specify the map container element
                center: center, // Set the center of the map using the provided props
                zoom: 10, // Set the initial zoom level
            });

            setMap(initializedMap); // Set the map object to state
        } catch (error) {
            console.error('Error initializing map:', error);
        }
    }, [center]); // Re-run effect when the center prop changes

    return (
        <div
            ref={mapElement}
            className="map-container"
            style={{ width: "420px", height: "320px" }} // Set the width and height of the map container
        />
    );
};

export default Map;
