import React from 'react';
import App from '../App';
import { render /*fireEvent, screen*/ } from '@testing-library/react';

test('App matches snapshot', () => {
	const { asFragment } = render(<App />);
	expect(asFragment()).toMatchSnapshot();
});
