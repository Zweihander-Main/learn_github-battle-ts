import * as React from 'react';
import { AppState } from '../types';

const { Consumer, Provider } = React.createContext(null as AppState);

export const ThemeConsumer = Consumer;
export const ThemeProvider = Provider;
