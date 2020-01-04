import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
	FaUserFriends,
	FaFighterJet,
	FaTrophy,
	FaTimesCircle,
} from 'react-icons/fa';
import { ThemeConsumer } from '../contexts/theme';
import { Link } from 'react-router-dom';

/**
 * Renders instructions for Battle
 *
 * @class      Instructions
 */
const Instructions: React.FC = (): JSX.Element => {
	return (
		<ThemeConsumer>
			{({ theme }: AppState): JSX.Element => (
				<div className="instructions-container">
					<h1 className="center-text header-lg">Instructions</h1>
					<ol className="container-sm grid center-text battle-instructions">
						<li>
							<h3 className="header-sm">
								Enter two GitHub users
							</h3>
							<FaUserFriends
								className={`bg-${theme}`}
								color="rgb(255,191,116)"
								size={140}
							/>
						</li>
						<li>
							<h3 className="header-sm">Battle</h3>
							<FaFighterJet
								className={`bg-${theme}`}
								color="#727272"
								size={140}
							/>
						</li>
						<li>
							<h3 className="header-sm">See the winners</h3>
							<FaTrophy
								className={`bg-${theme}`}
								color="rgb(255, 215,0)"
								size={140}
							/>
						</li>
					</ol>
				</div>
			)}
		</ThemeConsumer>
	);
};

interface PlayerInputProps extends React.Props<PlayerInput> {
	label: string;
	onSubmit: Function;
}

interface PlayerInputState {
	username: string;
}
/**
 * Controlled component for user input on Battle page.
 *
 * @class      PlayerInput
 */
class PlayerInput extends React.Component<PlayerInputProps, PlayerInputState> {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
		label: PropTypes.string.isRequired,
	};

	state = {
		username: '',
	};

	handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		this.props.onSubmit(this.state.username);
	};

	handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		this.setState({ username: event.target.value });
	};

	render(): JSX.Element {
		return (
			<ThemeConsumer>
				{({ theme }: AppState): JSX.Element => (
					<form
						className="column player"
						onSubmit={this.handleSubmit}
					>
						<label htmlFor="username" className="player-label">
							{this.props.label}
						</label>
						<div className="row player-inputs">
							<input
								type="text"
								className={`input-${theme}`}
								placeholder="github username"
								autoComplete="off"
								value={this.state.username}
								onChange={this.handleChange}
							/>
							<button
								className={`btn ${
									theme === 'dark' ? 'light-btn' : 'dark-btn'
								}`}
								type="submit"
								disabled={!this.state.username}
							>
								Submit
							</button>
						</div>
					</form>
				)}
			</ThemeConsumer>
		);
	}
}

interface PlayerPrevewProps {
	username: string;
	onReset: () => void;
	label: string;
}

/**
 * Renders preview of user after name is inputted
 *
 * @class      PlayerPreview
 * @return     {JSX.Element}
 */
const PlayerPreview: React.FC<PlayerPrevewProps> = ({
	username,
	onReset,
	label,
}: PlayerPrevewProps): JSX.Element => {
	return (
		<ThemeConsumer>
			{({ theme }: AppState): JSX.Element => (
				<div className="column player">
					<h3 className="player-label">{label}</h3>
					<div className={`row bg-${theme}`}>
						<div className="player-info">
							<img
								className="avatar-small"
								src={`https://github.com/${username}.png?size=200`}
								alt={`Avatar for ${username}`}
							/>
							<a
								href={`https://github.com/${username}`}
								className="link"
							>
								{username}
							</a>
						</div>
						<button
							className="btn-clear flex-center"
							onClick={onReset}
						>
							<FaTimesCircle color="rgb(194,57,42)" size={26} />
						</button>
					</div>
				</div>
			)}
		</ThemeConsumer>
	);
};

PlayerPreview.propTypes = {
	username: PropTypes.string.isRequired,
	onReset: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired,
};

interface BattleState {
	playerOne: string;
	playerTwo: string;
}

/**
 * Sets up state and inputs to battle two Github accounts.
 *
 * @class      Battle (name)
 */
export default class Battle extends React.Component<{}, BattleState> {
	state = {
		playerOne: null,
		playerTwo: null,
	};

	handleSubmit = (id: 'playerOne' | 'playerTwo', player: string): void => {
		this.setState({
			[id]: player,
		} as Record<'playerOne' | 'playerTwo', string>);
	};

	handleReset = (id: 'playerOne' | 'playerTwo'): void => {
		this.setState({
			[id]: null,
		} as Record<'playerOne' | 'playerTwo', string>);
	};

	render(): JSX.Element {
		const { playerOne, playerTwo } = this.state;

		return (
			<React.Fragment>
				<Instructions />
				<div className="players-container">
					<h1 className="center-text header-lg">Players</h1>
					<div className="row space-around">
						{playerOne === null ? (
							<PlayerInput
								label="Player One"
								onSubmit={(player: string): void =>
									this.handleSubmit('playerOne', player)
								}
							/>
						) : (
							<PlayerPreview
								username={playerOne}
								label="Player One"
								onReset={(): void =>
									this.handleReset('playerOne')
								}
							/>
						)}
						{playerTwo === null ? (
							<PlayerInput
								label="Player Two"
								onSubmit={(player: string): void =>
									this.handleSubmit('playerTwo', player)
								}
							/>
						) : (
							<PlayerPreview
								username={playerTwo}
								label="Player Two"
								onReset={(): void =>
									this.handleReset('playerTwo')
								}
							/>
						)}
					</div>

					{playerOne && playerTwo && (
						<Link
							className="btn dark-btn btn-space"
							to={{
								pathname: '/battle/results',
								search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`,
							}}
						>
							Battle
						</Link>
					)}
				</div>
			</React.Fragment>
		);
	}
}
