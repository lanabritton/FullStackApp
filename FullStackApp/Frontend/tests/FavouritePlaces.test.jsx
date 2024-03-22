import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FavouritePlaces from '../src/components/FavouritePlaces';

describe('FavouritePlaces component', () => {
  let localStorageMock;

  beforeEach(() => {
    // Mock localStorage globally
    localStorageMock = {
      getItem: () => {},
      setItem: () => {},
      clear: () => {}
    };
    global.localStorage = localStorageMock;
    // Clear any previously set items in localStorageMock
    localStorageMock.clear();
  });

  it('renders the component properly', () => {
    // Mock localStorage.getItem to return an array of favourite places
    localStorageMock.getItem = () => JSON.stringify(['New York', 'London', 'Paris']);
    
    render(
      <MemoryRouter>
        <FavouritePlaces />
      </MemoryRouter>
    );
    
    // Assert that each favourite place is rendered along with a remove button
    const favouritePlaces = ['New York', 'London', 'Paris'];
    favouritePlaces.forEach(place => {
      expect(screen.getByText(place)).toBeTruthy();
    });
  });

  it('handles remove button click and updates localStorage', () => {
    // Set favourite places in localStorage
    localStorageMock.getItem = () => JSON.stringify(['New York', 'London', 'Paris']);
    
    render(
      <MemoryRouter>
        <FavouritePlaces />
      </MemoryRouter>
    );
    
    const removeButton = screen.getByText('New York'); 
    fireEvent.click(removeButton);
    
    // After click, the updated favourite places should not contain the removed place
    const updatedFavouritePlaces = JSON.parse(localStorageMock.getItem('favouritePlaces'));
    expect(updatedFavouritePlaces).toEqual(['London', 'Paris']);
  });
});