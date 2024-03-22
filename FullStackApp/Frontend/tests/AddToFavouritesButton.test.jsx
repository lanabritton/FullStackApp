import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // You may need this for some additional matchers

import AddToFavouritesButton from '../src/components/AddToFavouritesButton';

describe('AddToFavouritesButton component', () => {
  test('renders the component properly', () => {
    const { getByText } = render(<AddToFavouritesButton city="New York" />);
    expect(getByText('Add to Favourites')).toBeTruthy();
  });
 });

