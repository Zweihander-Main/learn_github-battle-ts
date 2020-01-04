/* eslint-disable @typescript-eslint/camelcase */
import * as PropTypes from 'prop-types';

export const possibleLanguage = PropTypes.oneOf([
	'All',
	'JavaScript',
	'Ruby',
	'Java',
	'CSS',
	'Python',
] as Array<possibleLanguage>);

export const AppState = PropTypes.shape({
	theme: PropTypes.oneOf(['light', 'dark']).isRequired,
	toggleTheme: PropTypes.func.isRequired,
});

export const GitHubReponse = PropTypes.shape({
	message: PropTypes.string,
});

export const GitHubUsersResponse = PropTypes.exact({
	message: PropTypes.string,
	name: PropTypes.string,
	followers: PropTypes.number.isRequired,
	location: PropTypes.string,
	company: PropTypes.string,
	avatar_url: PropTypes.string.isRequired,
	login: PropTypes.string.isRequired,
	html_url: PropTypes.string,
	following: PropTypes.number.isRequired,
	id: PropTypes.number,
	node_id: PropTypes.string,
	gravatar_id: PropTypes.string,
	url: PropTypes.string,
	followers_url: PropTypes.string,
	following_url: PropTypes.string,
	gists_url: PropTypes.string,
	starred_url: PropTypes.string,
	subscriptions_url: PropTypes.string,
	organizations_url: PropTypes.string,
	repos_url: PropTypes.string,
	events_url: PropTypes.string,
	received_events_url: PropTypes.string,
	type: PropTypes.string,
	site_admin: PropTypes.bool,
	blog: PropTypes.string,
	email: PropTypes.any,
	hireable: PropTypes.any,
	bio: PropTypes.string,
	public_repos: PropTypes.number,
	public_gists: PropTypes.number,
	created_at: PropTypes.string,
	updated_at: PropTypes.string,
});

export const GitHubRepoItem = PropTypes.shape({
	name: PropTypes.string.isRequired,
	owner: GitHubUsersResponse.isRequired,
	html_url: PropTypes.string.isRequired,
	stargazers_count: PropTypes.number.isRequired,
	forks_count: PropTypes.number.isRequired,
	open_issues_count: PropTypes.number.isRequired,
});

export const GitHubUserRepoResponse = PropTypes.oneOf([
	GitHubReponse,
	PropTypes.arrayOf(GitHubRepoItem),
]);

export const GitHubSearchReponse = PropTypes.shape({
	message: PropTypes.string,
	total_count: PropTypes.number.isRequired,
	incomplete_results: PropTypes.bool.isRequired,
	items: PropTypes.array.isRequired,
});

export const UserData = PropTypes.shape({
	profile: GitHubUsersResponse,
	score: PropTypes.number.isRequired,
});

/* eslint-enable */
