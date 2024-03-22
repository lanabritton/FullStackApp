// tests not working since implementing the maps and been through node module like the error says but cannot get to work 

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WeatherPage from '../src/components/WeatherPage';

describe('WeatherPage', () => {
  test('renders loading message', () => {
    render(<WeatherPage />);
    expect(screen.getByText('Loading current weather...')).toBeTruthy();
  });

  test('renders weather data', async () => {
    render(<WeatherPage />);
    await waitFor(() => expect(screen.getByTestId('weather-data')).toBeTruthy());
  });

  test('adds city to favorites', async () => {
    render(<WeatherPage />);
    const addToFavoritesButton = await screen.findByTestId('add-to-favourites-button');
    userEvent.click(addToFavoritesButton);
  });

  test('does not fetch data when city is not provided', () => {
    render(<WeatherPage />);
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
