import * as React from 'react';
import './index.css';
import { ThemeProvider } from './contexts/theme';
import Nav from './components/Nav';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loading from './components/Loading';
import { AppState } from './types';

const Popular = React.lazy(() => import('./components/Popular'));
const Battle = React.lazy(() => import('./components/Battle'));
const Results = React.lazy(() => import('./components/Results'));

/**
 * Sets up application including theme context and routing
 *
 * @class      App (name)
 */
export default class App extends React.Component<Record<null, null>, AppState> {
	state = {
		theme: 'light',
		toggleTheme: (): void => {
			this.setState(({ theme }: AppState) => ({
				theme: theme === 'light' ? 'dark' : 'light',
			}));
		},
	} as AppState;

	render(): React.ReactNode {
		return (
			<Router>
				<ThemeProvider value={this.state}>
					<div className={this.state.theme}>
						<div className="container">
							<Nav />
							<React.Suspense fallback={<Loading />}>
								<Switch>
									<Route exact path="/" component={Popular} />
									<Route
										exact
										path="/battle"
										component={Battle}
									/>
									<Route
										path="/battle/results"
										component={Results}
									/>
									<Route
										render={(): React.ReactNode => (
											<h1>404</h1>
										)}
									/>
								</Switch>
							</React.Suspense>
						</div>
					</div>
				</ThemeProvider>
			</Router>
		);
	}
}
