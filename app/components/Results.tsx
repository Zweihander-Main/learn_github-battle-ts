import * as React from 'react';
import { GitHubUsersResponse as propTypesGitHubUsersReponse } from '../globals.PropTypes';
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

interface ResultsState {
	winner: UserData;
	loser: UserData;
	error: string;
	loading: boolean;
}

/**
 * Fetches data about both players and displays it
 *
 * @class      Results
 */
export default class Results extends React.Component<
	RouteComponentProps,
	ResultsState
> {
	state: ResultsState = {
		winner: null,
		loser: null,
		error: null,
		loading: true,
	};

	componentDidMount(): void {
		const { playerOne, playerTwo } = queryString.parse(
			this.props.location.search
		);

		battle([playerOne as string, playerTwo as string])
			.then((players: [UserData, UserData]): void =>
				this.setState({
					winner: players[0],
					loser: players[1],
					error: null,
					loading: false,
				})
			)
			.catch(({ message }: { message: string }): void => {
				this.setState({
					error: message,
					loading: false,
				});
			});
	}

	render(): React.ReactNode {
		const { winner, loser, error, loading } = this.state;

		if (loading === true) {
			return <Loading text="Battling" />;
		}

		if (error) {
			return <p className="center-text error">{error}</p>;
		}

		return (
			<React.Fragment>
				<div className="grid space-around container-sm">
					<Card
						header={winner.score === loser.score ? 'Tie' : 'Winner'}
						subheader={`Score: ${winner.score.toLocaleString()}`}
						avatar={winner.profile.avatar_url}
						href={winner.profile.html_url}
						name={winner.profile.login}
					>
						<ProfileList profile={winner.profile} />
					</Card>
					<Card
						header={winner.score === loser.score ? 'Tie' : 'Loser'}
						subheader={`Score: ${loser.score.toLocaleString()}`}
						avatar={loser.profile.avatar_url}
						href={loser.profile.html_url}
						name={loser.profile.login}
					>
						<ProfileList profile={loser.profile} />
					</Card>
				</div>
				<Link className="btn dark-btn btn-space" to="/battle">
					Reset
				</Link>
			</React.Fragment>
		);
	}
}
