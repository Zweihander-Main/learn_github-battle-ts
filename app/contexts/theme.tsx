import * as React from 'react';
import { AppState } from '../types';

const ThemeContext = React.createContext(null as AppState);

export default ThemeContext;

export const {
	Consumer: ThemeConsumer,
	Provider: ThemeProvider,
} = ThemeContext;
