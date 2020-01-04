import * as React from 'react';
import * as PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import { possibleLanguage as propTypesPossibleLanguage } from '../globals.PropTypes';
import {
	FaUser,
	FaStar,
	FaCodeBranch,
	FaExclamationTriangle,
} from 'react-icons/fa';
import Card from './Card';
import Loading from './Loading';
import Tooltip from './Tooltip';

interface LanguagesNavProps {
	selected: possibleLanguage;
	onUpdateLanguage: (possibleLanguage) => void;
}

/**
 * Renders navigation to switch between languages
 *
 * @class      LanguagesNav
 * @return     {JSX.Element}
 */
const LanguagesNav: React.FC<LanguagesNavProps> = ({
	selected,
	onUpdateLanguage,
}: LanguagesNavProps): JSX.Element => {
	const languages: Array<possibleLanguage> = [
		'All',
		'JavaScript',
		'Ruby',
		'Java',
		'CSS',
		'Python',
	];

	return (
		<ul className="flex-center">
			{languages.map((language: possibleLanguage) => {
				return (
					<li key={language}>
						<button
							className="btn-clean nav-link"
							style={
								language === selected
									? { color: 'rgb(187,46,31)' }
									: null
							}
							onClick={(): void => {
								onUpdateLanguage(language);
							}}
						>
							{language}
						</button>
					</li>
				);
			})}
		</ul>
	);
};

LanguagesNav.propTypes = {
	selected: propTypesPossibleLanguage.isRequired,
	onUpdateLanguage: PropTypes.func.isRequired,
};

interface ReposGridProps {
	repos: Array<GitHubRepoItem>;
}

/**
 * Renders grid of repositories with meta information
 *
 * @class      ReposGrid
 * @return     {JSX.Element}
 */
const ReposGrid: React.FC<ReposGridProps> = ({
	repos,
}: ReposGridProps): JSX.Element => {
	return (
		<ul className="grid space-around">
			{repos.map((repo: GitHubRepoItem, index: number) => {
				const {
					owner,
					html_url: htmlURL,
					stargazers_count: stargazersCount,
					forks_count: forksCount,
					open_issues_count: openIssuesCount,
				} = repo;
				const { login, avatar_url: avatarURL } = owner;

				return (
					<li key={htmlURL}>
						<Card
							header={`#${index + 1}`}
							avatar={avatarURL}
							href={htmlURL}
							name={login}
						>
							<ul className="card-list">
								<li>
									<Tooltip text="Github username">
										<FaUser
											color="rgb(255,191,116)"
											size={22}
										/>
										<a href={`https://github.com/${login}`}>
											{login}
										</a>
									</Tooltip>
								</li>
								<li>
									<FaStar color="rgb(255,215,0)" size={22} />
									{stargazersCount.toLocaleString()} stars
								</li>
								<li>
									<FaCodeBranch
										color="rgb(129,195,245)"
										size={22}
									/>
									{forksCount.toLocaleString()} forks
								</li>
								<li>
									<FaExclamationTriangle
										color="rgb(241,138,147)"
										size={22}
									/>
									{openIssuesCount.toLocaleString()} open
								</li>
							</ul>
						</Card>
					</li>
				);
			})}
		</ul>
	);
};

interface PopularState {
	selectedLanguage: possibleLanguage;
	error: string;
	repos: Record<possibleLanguage, Array<GitHubRepoItem>>;
}

/**
 * Fetches data of popular repos and renders them in a grid navigable by
 * language
 *
 * @class      Popular
 */
export default class Popular extends React.Component<{}, PopularState> {
	state = {
		selectedLanguage: 'All' as possibleLanguage,
		repos: {} as Record<possibleLanguage, Array<GitHubRepoItem>>,
		error: null,
	};

	componentDidMount(): void {
		this.updateLanguage(this.state.selectedLanguage);
	}

	updateLanguage = (selectedLanguage: possibleLanguage): void => {
		this.setState({
			selectedLanguage,
			error: null,
		});

		if (!this.state.repos[selectedLanguage]) {
			fetchPopularRepos(selectedLanguage)
				.then((data: Array<GitHubRepoItem>) =>
					this.setState(
						({
							repos,
						}: {
							repos: Record<
								possibleLanguage,
								Array<GitHubRepoItem>
							>;
						}) => {
							return {
								repos: {
									...repos,
									[selectedLanguage]: data,
								},
							};
						}
					)
				)
				.catch((e: string) => {
					console.warn('Error fetching repos: ', e);

					this.setState({
						error: 'There was an error fetching the repositories.',
					});
				});
		}
	};

	isLoading = (): boolean => {
		const { selectedLanguage, repos, error } = this.state;
		return !repos[selectedLanguage] && error === null;
	};

	render(): JSX.Element {
		const { selectedLanguage, repos, error } = this.state;
		return (
			<React.Fragment>
				<LanguagesNav
					selected={selectedLanguage}
					onUpdateLanguage={this.updateLanguage}
				/>

				{this.isLoading() && <Loading text="Fetching Repos" />}

				{error && <p className="center-text error">{error}</p>}

				{repos[selectedLanguage] && (
					<ReposGrid repos={repos[selectedLanguage]} />
				)}
			</React.Fragment>
		);
	}
}
