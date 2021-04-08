import * as React from 'react';
import {
	GitHubUsersResponsePT as propTypesGitHubUsersReponse,
	GitHubUsersResponse,
	UserData,
} from '../types';
import { battle } from '../utils/api';
import { FaCompass, FaUsers, FaUserFriends, FaUser } from 'react-icons/fa';
import Card from './Card';
import Loading from './Loading';
import Tooltip from './Tooltip';
import queryString from 'query-string';
import { Link, RouteComponentProps } from 'react-router-dom';

interface ProfileListProps {
	profile: GitHubUsersResponse;
}

/**
 * Renders information in a user profile
 *
 * @class      ProfileList
 * @return     {React.ReactNode}
 */
const ProfileList: React.FC<ProfileListProps> = ({
	profile,
}: ProfileListProps) => {
	return (
		<ul className="card-list">
			<li>
				<FaUser color="rgb(239,115,115)" size={22} />
				{profile.name}
			</li>
			{profile.location && (
				<li>
					<Tooltip text="User's Location">
						<FaCompass color="rgb(144,115,255)" size={22} />
						{profile.location}
					</Tooltip>
				</li>
			)}
			{profile.company && (
				<li>
					<Tooltip text="User's Company">
						<FaCompass color="#795548" size={22} />
						{profile.company}
					</Tooltip>
				</li>
			)}
			<li>
				<FaUsers color="rgb(129,195,245)" size={22} />
				{profile.followers.toLocaleString()} followers
			</li>
			<li>
				<FaUserFriends color="rgb(64,183,95)" size={22} />
				{profile.following.toLocaleString()} following
			</li>
		</ul>
	);
};

ProfileList.propTypes = {
	profile: propTypesGitHubUsersReponse.isRequired,
};

interface ResultsReducerState {
	winner: UserData;
	loser: UserData;
	error: string;
	loading: boolean;
}

type ResultsReducerAction =
	| { type: 'success'; winner: UserData; loser: UserData }
	| { type: 'error'; message: string };

function battleReducer(
	state: ResultsReducerState,
	action: ResultsReducerAction
): ResultsReducerState {
	switch (action.type) {
		case 'success': {
			return {
				winner: action.winner,
				loser: action.loser,
				error: null,
				loading: false,
			};
		}
		case 'error': {
			return {
				...state,
				error: action.message,
				loading: false,
			};
		}
	}
}

/**
 * Fetches data about both players and displays it
 */
const Results: React.FC<RouteComponentProps> = ({
	location,
}: RouteComponentProps) => {
	const { playerOne, playerTwo } = queryString.parse(location.search);
	const [state, dispatch] = React.useReducer(battleReducer, {
		winner: null,
		loser: null,
		error: null,
		loading: true,
	});

	React.useEffect(() => {
		battle([playerOne as string, playerTwo as string])
			.then((players: [UserData, UserData]): void => {
				dispatch({
					type: 'success',
					winner: players[0],
					loser: players[1],
				});
			})
			.catch(({ message }: { message: string }): void => {
				dispatch({ type: 'error', message });
			});
	}, [playerOne, playerTwo]);

	if (state.loading === true) {
		return <Loading text="Battling" />;
	}

	if (state.error) {
		return <p className="center-text error">{state.error}</p>;
	}

	return (
		<React.Fragment>
			<div className="grid space-around container-sm">
				<Card
					header={
						state.winner.score === state.loser.score
							? 'Tie'
							: 'Winner'
					}
					subheader={`Score: ${state.winner.score.toLocaleString()}`}
					avatar={state.winner.profile.avatar_url}
					href={state.winner.profile.html_url}
					name={state.winner.profile.login}
				>
					<ProfileList profile={state.winner.profile} />
				</Card>
				<Card
					header={
						state.winner.score === state.loser.score
							? 'Tie'
							: 'Loser'
					}
					subheader={`Score: ${state.loser.score.toLocaleString()}`}
					avatar={state.loser.profile.avatar_url}
					href={state.loser.profile.html_url}
					name={state.loser.profile.login}
				>
					<ProfileList profile={state.loser.profile} />
				</Card>
			</div>
			<Link className="btn dark-btn btn-space" to="/battle">
				Reset
			</Link>
		</React.Fragment>
	);
};
export default Results;
