import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Col, Container, Dropdown, Navbar, Row, Text, User } from "@nextui-org/react"
// import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
// import { DateRange } from '@mui/x-date-pickers-pro';
import { DateRangePicker } from 'react-date-range'
import { getAccessTokenGithub, getCommits, getContributorActivity, getIssueResolutionTime, getPullRequestsTrends, getRepos, getUserDataGithub, getUserDataGoogle } from "./services/home-services"
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LogOutIcon } from "../../assets/icons"
import { Line, Bar,} from 'react-chartjs-2';
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement} from "chart.js";
ChartJs.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend,BarElement);
interface UserDataGithub {
	avatar_url: string
	login: string
	bio: string
}
interface UserCommitData{
	url: string
	commit: Commit
}
interface Commit{
	author: Author
}
interface UserPullRequest{
	url: string
	state: string
	open_issues: number
	closed_issues: number
	watchers_count: number
	forks_count: number
}
interface UserIssueResolution{
	created_at: string
	closed_at: string
	state_reason: string
	open_issues: number
	closed_issues: number
}
interface ContributorActivity{
	author: Author
	total: number
	weeks: Week[]
}
interface Author{
	login: string
	date: string	
}
interface Week{
	w: number
	a: number
	d: number
	c: number 
}
interface Repo{
	name: string
	full_name: string
	owner: Author
}
interface UserdataGoogle {
	name: string
	picture: string
	email: string
}
interface RepoData{
	name: string
	owner: string
}
interface DateRange{
	startDate: Date
	endDate: Date
	key: string
}
const Home = () => {
	const getRepoData = (username: string) => {
		const accessToken = localStorage.getItem("accessToken")
		getRepos(username,accessToken!=null?accessToken:"").then((resp: Repo[]) => {
			console.log(resp);
			setRep(resp);
		});
	}
	const metrics = (owner: string, repo: string) => {
		let access = localStorage.getItem("accessToken")
		if(access!=null){
		getCommits(owner,repo,access).then((resp: UserCommitData[]) => {
			console.log(resp)
			setCommits(resp.filter((q) => {
				const date = new Date(q.commit.author.date);
				return date>=dateRange.startDate && date<=dateRange.endDate
			}))
		})
		getPullRequestsTrends(owner,repo,access).then((resp: UserPullRequest[]) => {
			console.log(resp)
			setRequests(resp)
		})
		getIssueResolutionTime(owner,repo,access).then((resp: UserIssueResolution[]) => {
			console.log(resp)
			setIssRes(resp)
		})
		getContributorActivity(owner,repo,access).then((resp: ContributorActivity[]) => {
			console.log(resp)
			setConAct(resp)
		})
	}
	}
	const formatDate = (dateString: string): string => {
		const date = new Date(dateString);
		return date.toLocaleDateString();
	  };
	const onRepoSelect = (name: any) => {
		const x = rep.filter((r) => r.name == [...name][0]);
		console.log(x,[...name][0]);
		if(x.length!=0){
		setData({name:x[0].name,owner:x[0].owner.login});
		console.log(data);
		metrics(x[0].owner.login,x[0].name);
		}
		return x[0].name;
	} 
	const handleSelect = (ranges: any) => {
		console.log(ranges);
		setDateRange(ranges.selection);
	  }
	const [commits, setCommits] = useState<UserCommitData[]>([]);
	const [requests, setRequests] = useState<UserPullRequest[]>([]);
	const [issres, setIssRes] = useState<UserIssueResolution[]>([]);
	const [conact, setConAct] = useState<ContributorActivity[]>([]);
	const [rep, setRep] = useState<Repo[]>([]);
	const [data,setData] = useState<RepoData>();
	const [userDataGithub, setUserDataGithub] = useState<null | UserDataGithub>(null)
	const [userDataGoogle, setUserDataGoogle] = useState<null | UserdataGoogle>(null)
	const [dateRange, setDateRange] = useState<DateRange>({
		startDate: new Date(),
		endDate: new Date(),
		key: 'selection',
	  });
	const loginWith = useRef(localStorage.getItem("loginWith"))

	const navigate = useNavigate()

	useEffect(() => {
		const queryString = window.location.search
		const urlParams = new URLSearchParams(queryString)
		const codeParam = urlParams.get("code")

		const accessToken = localStorage.getItem("accessToken")

		if (codeParam && !accessToken && loginWith.current === "GitHub") {
			getAccessTokenGithub(codeParam).then(resp => {
				localStorage.setItem("accessToken", resp.access_token)
				const a = resp.access_token;
				getUserDataGithub(resp.access_token).then((resp: UserDataGithub) => {
					setUserDataGithub(resp)
				getRepoData(resp.login);
				})

			})
		} else if (codeParam && accessToken && loginWith.current === "GitHub") {
			getUserDataGithub(accessToken).then((resp: UserDataGithub) => {
				localStorage.setItem("accessToken", accessToken)
				setUserDataGithub(resp)
				getRepoData(resp.login);
			})
		}
	}, [loginWith])

	useEffect(() => {
		const accessToken = localStorage.getItem("accessToken")

		if (accessToken && loginWith.current === "Google") {
			getUserDataGoogle(accessToken).then(resp => {
				setUserDataGoogle(resp)
			})
		}
	}, [loginWith])

	const setLogOut = () => {
		localStorage.removeItem("accessToken")
		localStorage.removeItem("loginWith")
		navigate("/")
	}

	if (!userDataGithub && !userDataGoogle) return null

	return (
		<>
			<Navbar isBordered variant='sticky'>
				<Navbar.Brand>
					<User
						bordered
						color='primary'
						size='lg'
						src={loginWith.current === "GitHub" ? userDataGithub?.avatar_url : userDataGoogle?.picture}
						name={loginWith.current === "GitHub" ? userDataGithub?.login : userDataGoogle?.name}
						description={loginWith.current === "GitHub" ? userDataGithub?.bio : userDataGoogle?.email}
					/>
					{/* <button onClick={getRepoData}>RepoData</button> */}
				</Navbar.Brand>
				<Navbar.Content>
					<Navbar.Item>
						<Button
							auto
							flat
							size='sm'
							icon={<LogOutIcon fill='currentColor' />}
							color='primary'
							onClick={() => setLogOut()}
						>
							Log out
						</Button>
					</Navbar.Item>
				</Navbar.Content>
			</Navbar>
			<Container gap={0}>
				<Row gap={1}>
					<Col>
						<Text h2>Login with {loginWith.current}</Text>
					</Col>
				</Row>
			</Container>
			<div>
			<DateRangePicker
        	ranges={[dateRange]}
        	onChange={handleSelect}
      		/>
		<h3>Select Repo</h3>
		<Dropdown>
      <Dropdown.Button flat>{data?.name}</Dropdown.Button>
      <Dropdown.Menu  items={rep}
	          aria-label="Single selection actions"
			  color="secondary"
			  disallowEmptySelection
			  selectionMode="single"
			  selectedKeys={data?.name}
			  onSelectionChange={onRepoSelect}
			>

        {rep!=null?(item) => (
          <Dropdown.Item
            key={(item as Repo).name}
            color="default"
          >
            {(item as Repo).name}
          </Dropdown.Item>
        ):<></>}
      </Dropdown.Menu>
    </Dropdown>
	{/* <h3>{data?.name}</h3> */}
      <h2>Commits Over Time</h2>
	  {commits!=null? 
      <Line
        data={{
          labels: commits.map((commit) => formatDate(commit.commit.author.date)),
          datasets: [
            {
              label: 'Number of Commits',
              data: Array.from({ length: commits.length }, (_, i) => i + 1),
              fill: false,
			  borderColor: 'white',
			  backgroundColor: 'white',
            },
          ],
        }}
      />:<></>
	}
	{requests!=null?
	<>
	<h2>Pull Requests </h2>
      <Line
        data={{
          labels: ["open","close"],
          datasets: [
            {
              label: 'Number of Pull requests',
              data: [requests.filter((r) => r.state=="open").length,requests.filter((r) => r.state=="closed").length], 
              fill: false,
			  borderColor: 'white',
			  backgroundColor: 'white',
            },
          ],
        }}/></>:<></>}
		{issres!=null?<>
	<h2>Issue Resolution Time</h2> 
      <Bar
        data={{
          labels: issres.map((i) => i.state_reason),
          datasets: [
            {
              label: 'Open issues and closed issues',
              data: issres.map((i) => i.open_issues),
			  borderColor: 'white',
			  backgroundColor: 'white',
            },
          ],
        }}
      /></>:<></>
	}
	  {conact!=null&&conact.length!=0&&conact!=undefined?<>
	<h2>Contributor Activity</h2>
      <Bar
        data={{
          labels: conact.map((con) => con.author.login),
          datasets: [
            {
              label: 'Number of Commits made by each contributor',
              data: conact.map((con) => con.total),
			  borderColor: 'white',
			  backgroundColor: 'white',
            },
          ],
        }}
      /></>:<></>
	}
      {/* Similar charts for pull requests, issues, and contributor activity */}
    </div>
		</>
	)
}

export default Home
