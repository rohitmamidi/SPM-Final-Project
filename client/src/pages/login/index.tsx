import { useGoogleLogin } from "@react-oauth/google"
import { useNavigate } from "react-router-dom"

import { Card, Spacer, Button, Text, Container } from "@nextui-org/react"

import { IconGitHub, IconGoogle } from "../../assets/icons"

const GITHUB_CLIENT_ID = "8b74c25d0be8b7d3363c"

const Login = () => {
	const navigate = useNavigate()

	const loginToGithub = () => {
		localStorage.setItem("loginWith", "GitHub")
		window.location.assign(`https://github.com/login/oauth/authorize?client_id=8b74c25d0be8b7d3363c`)
	}

	const loginToGoogle = useGoogleLogin({
		onSuccess: tokenResponse => {
			localStorage.setItem("loginWith", "Google")
			localStorage.setItem("accessToken", tokenResponse.access_token)
			navigate("/home")
		},
	})

	return (
		<Container display='flex' alignItems='center' justify='center' css={{ minHeight: "100vh" }}>
			<Card css={{ mw: "420px", p: "20px" }}>
				<Text
					size={24}
					weight='bold'
					css={{
						as: "center",
						mb: "20px",
					}}
				>
					Login with
				</Text>
				<Spacer y={1} />
				<Button color='gradient' auto ghost onClick={() => loginToGithub()}>
					<IconGitHub />
					<Spacer x={0.5} />
					GitHub
				</Button>
				<Spacer y={1} />
			</Card>
		</Container>
	)
}

export default Login
