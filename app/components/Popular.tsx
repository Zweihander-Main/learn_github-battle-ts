import * as React from 'react';
import * as PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import {
	possibleLanguagePT as propTypesPossibleLanguage,
	possibleLanguage,
	GitHubRepoItem,
} from '../types';
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
 * @return     {React.ReactNode}
 */
const LanguagesNav: React.FC<LanguagesNavProps> = ({
	selected,
	onUpdateLanguage,
}: LanguagesNavProps) => {
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
							className="btn-clear nav-link"
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
 * @return     {React.ReactNode}
 */
const ReposGrid: React.FC<ReposGridProps> = ({ repos }: ReposGridProps) => {
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
									issues
								</li>
							</ul>
						</Card>
					</li>
				);
			})}
		</ul>
	);
};

type PopularReducerState = {
	error: string;
} & Record<possibleLanguage, Array<GitHubRepoItem>>;

type PopularReducerAction =
	| {
			type: 'success';
			repos: Array<GitHubRepoItem>;
			selectedLanguage: possibleLanguage;
	  }
	| { type: 'error'; error: { message: string } }
	| { type: null; repos: null; selectedLanguage: null; error: null };

function popularReducer(
	state: PopularReducerState,
	action: PopularReducerAction
): PopularReducerState {
	switch (action.type) {
		case 'success': {
			return {
				...state,
				[action.selectedLanguage]: action.repos,
				error: null,
			};
		}
		case 'error': {
			return {
				...state,
				error: action.error.message,
			};
		}
		default:
			return state;
	}
}

/**
 * Fetches data of popular repos and renders them in a grid navigable by
 * language
 */
const Popular: React.FC = () => {
	const [selectedLanguage, setSelectedLanguage] = React.useState<
		possibleLanguage
	>('All');

	const [state, dispatch] = React.useReducer(popularReducer, {
		error: null,
	} as PopularReducerState);

	const fetchedLanguages = React.useRef<Array<possibleLanguage>>([]);

	React.useEffect(() => {
		if (fetchedLanguages.current.includes(selectedLanguage) === false) {
			fetchedLanguages.current.push(selectedLanguage);
			fetchPopularRepos(selectedLanguage)
				.then((repos) =>
					dispatch({ type: 'success', selectedLanguage, repos })
				)
				.catch((error: { message: string }) =>
					dispatch({ type: 'error', error })
				);
		}
	}, [fetchedLanguages, selectedLanguage]);

	const isLoading = (): boolean => {
		return !state[selectedLanguage] && state.error === null;
	};

	return (
		<React.Fragment>
			<LanguagesNav
				selected={selectedLanguage}
				onUpdateLanguage={setSelectedLanguage}
			/>

			{isLoading() && <Loading text="Fetching Repos" />}

			{state.error && <p className="center-text error">{state.error}</p>}

			{state[selectedLanguage] && (
				<ReposGrid repos={state[selectedLanguage]} />
			)}
		</React.Fragment>
	);
};
export default Popular;
