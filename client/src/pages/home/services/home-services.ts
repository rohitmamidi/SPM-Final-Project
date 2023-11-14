import axios from "axios"

export const getAccessTokenGithub = async (code: string): Promise<any> => {
	const { data } = await axios.get(`http://localhost:3001/api/github/accessToken?code=${code}`, {
		headers: {
			"Content-Type": "application/json",
		},
	})

	return data
}

export const getUserDataGithub = async (accessToken: string) => {
	const { data } = await axios.get(`http://localhost:3001/api/github/userData?accessToken=${accessToken}`, {
		headers: {
			"Content-Type": "application/json",
		},
	})
	return data
}
export const getCommits = async (owner: string, repo: string, accessToken: string) => {
	const { data } = await axios.get(`http://localhost:3001/api/github/commits?accessToken=${accessToken}&repo=${repo}&owner=${owner}`,{
		headers: {
			"Content-Type": "application/json",
		},		
	})
	return data
}
export const getPullRequestsTrends = async (owner: string, repo: string, accessToken: string) => {
	const { data } = await axios.get(`http://localhost:3001/api/github/pullRequests?accessToken=${accessToken}&repo=${repo}&owner=${owner}`,{
		headers: {
			"Content-Type": "application/json",
		},		
	})
	return data
}
export const getIssueResolutionTime = async (owner: string, repo: string, accessToken: string) => {
	const { data } = await axios.get(`http://localhost:3001/api/github/resolutionTime?accessToken=${accessToken}&repo=${repo}&owner=${owner}`,{
		headers: {
			"Content-Type": "application/json",
		},		
	})
	return data
}
export const getContributorActivity = async(owner: string, repo: string, accessToken: string) => {
	const { data } = await axios.get(`http://localhost:3001/api/github/contributorActivity?accessToken=${accessToken}&repo=${repo}&owner=${owner}`,{
		headers:{
			"Content-Type": "applcation/json",
		}
	})
	return data
}	
export const getUserDataGoogle = async (accessToken: string) => {
	const { data } = await axios.get(`http://localhost:3001/api/google/userData?accessToken=${accessToken}`, {
		headers: {
			"Content-Type": "application/json",
		},
	})
	return data
}
export const getRepos = async (username: string, accessToken: string) => {
	const { data } = await axios.get(`http://localhost:3001/api/github/repos?accessToken=${accessToken}&username=${username}`, {
		headers: {
			"Content-Type": "application/json",
		},
	})
	return data
}