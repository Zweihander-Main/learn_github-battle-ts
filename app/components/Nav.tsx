import * as React from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../contexts/theme';
import { NavLink } from 'react-router-dom';

const activeStyle: React.CSSProperties = {
	color: 'rgb(187,46,31)',
};

interface NavProps {
	toggleTheme: () => void;
}

/**
 * Renders a navigation bar with links to two different GitHub related pages
 *
 * @class      Nav
 * @return     {React.ReactNode}
 */
const Nav: React.FC<NavProps> = ({ toggleTheme }) => {
	const theme = React.useContext(ThemeContext);

	return (
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
	);
};

Nav.propTypes = {
	toggleTheme: PropTypes.func.isRequired,
};

export default Nav;
