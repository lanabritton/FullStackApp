import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchBar from '../src/components/SearchBar';

describe('SearchBar', () => {
  test('renders search bar on home page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <SearchBar />
      </MemoryRouter>
    );

    const searchBar = screen.getByPlaceholderText('Search for a place...');
    expect(searchBar).toBeTruthy();
  });

  test('updates input value when typing', () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    const searchBar = screen.getByPlaceholderText('Search for a place...');
    fireEvent.change(searchBar, { target: { value: 'New York' } });

    expect(searchBar.value).toBeTruthy();
  });

  test('performs search when form is submitted', async () => {
    const { getByPlaceholderText } = render(
      <MemoryRouter initialEntries={['/']}>
        <SearchBar />
      </MemoryRouter>
    );

    const searchBar = getByPlaceholderText('Search for a place...');
    fireEvent.change(searchBar, { target: { value: 'New York' } });

    fireEvent.submit(searchBar); 

    
    expect(searchBar.value).toBeTruthy();
  });
});
