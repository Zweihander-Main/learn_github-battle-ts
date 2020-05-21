import * as React from 'react';
import { ThemeConsumer } from '../contexts/theme';
import { NavLink } from 'react-router-dom';
import { AppState } from '../types';

const activeStyle: React.CSSProperties = {
	color: 'rgb(187,46,31)',
};
/**
 * Renders a navigation bar with links to two different GitHub related pages
 *
 * @class      Nav
 * @return     {React.ReactNode}
 */
const Nav: React.FC = () => {
	return (
		<ThemeConsumer>
			{({ theme, toggleTheme }: AppState): React.ReactNode => (
				<nav className="row space-between">
					<ul className="row nav">
						<li>
							<NavLink
								activeStyle={activeStyle}
								exact
								to="/"
								className="nav-link"
							>
								Popular
							</NavLink>
						</li>
						<li>
							<NavLink
								activeStyle={activeStyle}
								to="/battle"
								className="nav-link"
							>
								Battle
							</NavLink>
						</li>
					</ul>
					<button
						style={{ fontSize: 30 }}
						className="btn-clear"
						onClick={toggleTheme}
					>
						{theme === 'light' ? '🔦' : '💡'}
					</button>
				</nav>
			)}
		</ThemeConsumer>
	);
};

export default Nav;
