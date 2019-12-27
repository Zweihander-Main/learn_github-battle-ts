type possibleLanguage =
	| 'All'
	| 'JavaScript'
	| 'Ruby'
	| 'Java'
	| 'CSS'
	| 'Python';

interface AppState {
	theme: 'light' | 'dark';
	toggleTheme: () => void;
}

interface GitHubReponse {
	message?: string;
}

interface GitHubUsersResponse extends GitHubReponse {
	name: string;
	followers: number;
	location: string;
	company: string;
	avatar_url: string;
	login: string;
	html_url: string;
	following: number;
}

type GitHubUserRepoResponse = GitHubReponse | Array<GitHubRepoItem>;

interface GitHubSearchReponse<T> extends GitHubReponse {
	total_count: number;
	incomplete_results: boolean;
	items: Array<T>;
}

interface UserData {
	profile: GitHubUsersResponse;
	score: number;
}

interface GitHubRepoItem {
	name: string;
	owner: GitHubUsersResponse;
	html_url: string;
	stargazers_count: number;
	forks_count: number;
	open_issues_count: number;
}
