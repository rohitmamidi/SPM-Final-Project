import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

type AccessTokenData = {
  access_token: string;
  token_type: string;
  scope: string;
} | null;

export const getAccessToken = async (
  code: string,
): Promise<AccessTokenData> => {
  try {
    const params = `?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`;

    const { data } = await axios.post(
      `https://github.com/login/oauth/access_token${params}`,
      {},
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserData = async (accessToken: string) => {
  try {
    const { data } = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  } catch (error) {
    return null;
  }
};
export const getCommits = async (owner: string, repo: string,accessToken: string) => {
  try {
    const { data } = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  } catch (error) {
    return null;
  }
}
export const getPullRequestsTrends = async (owner: string, repo: string,accessToken: string) => {
  const url = `https://api.github.com/repos/${owner}/${repo}/pulls`;
  console.log("PullRequests",url);
  try {
    const { data } = await axios.get(url,{
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }})
console.log(data);
    // Example: Log the number of open pull requests
    const openPullRequests = data.filter((pr: any) => pr.state === 'open');
    console.log(`Open Pull Requests: ${openPullRequests.length}`);

    // Example: Log the number of closed pull requests
    const closedPullRequests = data.filter((pr: any) => pr.state === 'closed');
    console.log(`Closed Pull Requests: ${closedPullRequests.length}`);

    // You can perform more analysis based on your requirements
    return data;
  } catch (error) {
    // console.error('Error fetching pull requests:', error);
    return null;
  }
}

export const getIssueResolutionTime = async(owner: string, repo: string,accessToken: string) => {
  const url = `https://api.github.com/repos/${owner}/${repo}/issues`;

  try {
    const response = await axios.get(url,{
      headers:{
        Authorization: `Bearer ${accessToken}`,
      }
    });
    const issues = response.data;
    console.log(response.data);
    issues.forEach((issue: any) => {
      const createdAt = new Date(issue.created_at);
      const closedAt = issue.closed_at ? new Date(issue.closed_at) : null;

      if (closedAt) {
        const resolutionTime = closedAt.getTime() - createdAt.getTime();
        console.log(`Issue #${issue.number} resolution time: ${resolutionTime / (1000 * 60)} minutes`);
      } else {
        console.log(`Issue #${issue.number} is still open`);
      }
    });
    return issues;
  } catch (error) {
    // console.error('Error fetching issues:', error);
    return null;
  }
}
export const getContributorActivity = async(owner: string, repo: string,accessToken: string) => {
  const url = `https://api.github.com/repos/${owner}/${repo}/stats/contributors`;
  console.log(url);
  try {
    const response = await axios.get(url,{
      headers:
        {
          Authorization: `Bearer ${accessToken}`,
        }
    });
    const contributors = response.data;
    console.log(response.status);
    // contributors.forEach((contributor: any) => {
      // console.log(`Contributor: ${contributor.author.login}`);
      // console.log(`  Commits: ${contributor.total}`);
      // console.log('---');
    // });
    console.log(contributors.length);
    return contributors
  } catch (error) {
    console.error('Error fetching contributor activity:', error);
    return null;
  }
}
export const getRepos = async (username: string, accessToken: string) =>{
  try{
    console.log(username,accessToken);
    const { data } = await axios.get(`https://api.github.com/users/${username}/repos`,{
      headers:{
        Authorization: `Bearer ${accessToken}`
      }
    })
    return data;
  }
  catch(error){
    // console.error('Error fetching repo:',error);
    return null;
  }
}