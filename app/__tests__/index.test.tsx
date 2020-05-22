import React from 'react';
import App from '../App';
import { render, fireEvent, screen } from '@testing-library/react';

test('Popular and battle pages match snapshots', () => {
	const { asFragment } = render(<App />);
	expect(asFragment()).toMatchSnapshot();
	fireEvent.click(screen.getByText('Battle'));
	expect(asFragment()).toMatchSnapshot();
});
