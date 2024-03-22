import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../src/components/Header';

test('renders header with navigation links', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  // brand text is present
  const brandElement = screen.getByText('DFCorp');
  expect(brandElement).toBeTruthy();

  // Home link is present
  const homeLink = screen.getByText('Home');
  expect(homeLink).toBeTruthy();

  // Favourite Places link 
  const favouritePlacesLink = screen.getByText('Favourite Places');
  expect(favouritePlacesLink).toBeTruthy();

  // NavDropdown u
  const menuDropdown = screen.queryByText('Menu');
  expect(menuDropdown).toBeNull(); // Should not be present on smaller screens

  //  hamburger icon is present on smaller screens
  const hamburgerIcon = screen.getByLabelText('Toggle navigation');
  expect(hamburgerIcon).toBeTruthy();
});