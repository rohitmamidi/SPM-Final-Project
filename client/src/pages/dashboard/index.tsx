import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Bar,} from 'react-chartjs-2';

interface Commit {
  commit: {
    author: {
      date: string;
    };
  };
}

interface PullRequest {
  // Define the structure based on the actual data
}

interface Issue {
  // Define the structure based on the actual data
}

interface Contributor {
  author: {
    login: string;
  };
  total: number;
}

const Dashboard = () => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [contributors, setContributors] = useState<Contributor[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const owner = "rohitmamidi";
      const repo = 'Dieroller';
      const token = localStorage.getItem("accessToken"); // Provide your GitHub access token

      // Fetch data from GitHub APIs
      const commitsResponse = await axios.get<Commit[]>(`https://api.github.com/repos/${owner}/${repo}/commits`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCommits(commitsResponse.data);

      // Fetch other data (pull requests, issues, contributors) similarly...

      // For brevity, you can use placeholder data for pull requests, issues, and contributors.
      const placeholderData: any[] = [];
      setPullRequests(placeholderData);
      setIssues(placeholderData);
      setContributors(placeholderData);
    };

    fetchData();
  }, []);

  // Helper function to format dates
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div>
      <h2>Commits Over Time</h2>
      <Line
        data={{
          labels: commits.map((commit) => formatDate(commit.commit.author.date)),
          datasets: [
            {
              label: 'Number of Commits',
              data: Array.from({ length: commits.length }, (_, i) => i + 1),
              fill: false,
              borderColor: 'blue',
            },
          ],
        }}
      />

      {/* Similar charts for pull requests, issues, and contributor activity */}
    </div>
  );
};

export default Dashboard
