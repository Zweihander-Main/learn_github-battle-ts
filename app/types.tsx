import * as PropTypes from 'prop-types';

export type possibleLanguage =
	| 'All'
	| 'JavaScript'
	| 'Ruby'
	| 'Java'
	| 'CSS'
	| 'Python';

export type AppState = 'light' | 'dark';

export interface GitHubReponse {
	message?: string;
}

export interface GitHubUsersResponse extends GitHubReponse {
	name?: string;
	followers: number;
	location?: string;
	company?: string;
	avatar_url: string;
	login: string;
	html_url?: string;
	following: number;
}

export type GitHubUserRepoResponse = GitHubReponse | Array<GitHubRepoItem>;

export interface GitHubSearchReponse<T> extends GitHubReponse {
	total_count: number;
	incomplete_results: boolean;
	items: Array<T>;
}

export interface UserData {
	profile: GitHubUsersResponse;
	score: number;
}

export interface GitHubRepoItem {
	name: string;
	owner: GitHubUsersResponse;
	html_url: string;
	stargazers_count: number;
	forks_count: number;
	open_issues_count: number;
}

export const possibleLanguagePT = PropTypes.oneOf([
	'All',
	'JavaScript',
	'Ruby',
	'Java',
	'CSS',
	'Python',
] as Array<possibleLanguage>);

export const AppStatePT = PropTypes.shape({
	theme: PropTypes.oneOf(['light', 'dark']).isRequired,
	toggleTheme: PropTypes.func.isRequired,
});

export const GitHubReponsePT = PropTypes.shape({
	message: PropTypes.string,
});

export const GitHubUsersResponsePT = PropTypes.exact({
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

export const GitHubRepoItemPT = PropTypes.shape({
	name: PropTypes.string.isRequired,
	owner: GitHubUsersResponsePT.isRequired,
	html_url: PropTypes.string.isRequired,
	stargazers_count: PropTypes.number.isRequired,
	forks_count: PropTypes.number.isRequired,
	open_issues_count: PropTypes.number.isRequired,
});

export const GitHubUserRepoResponsePT = PropTypes.oneOf([
	GitHubReponsePT,
	PropTypes.arrayOf(GitHubRepoItemPT),
]);

export const GitHubSearchReponsePT = PropTypes.shape({
	message: PropTypes.string,
	total_count: PropTypes.number.isRequired,
	incomplete_results: PropTypes.bool.isRequired,
	items: PropTypes.array.isRequired,
});

export const UserDataPT = PropTypes.shape({
	profile: GitHubUsersResponsePT,
	score: PropTypes.number.isRequired,
});
