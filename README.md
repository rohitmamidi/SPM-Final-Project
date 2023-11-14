# 👤 GITHUB ANALYTICS DASHBOARD

Login app with GitHub

### Front-end
* React js
* [Next UI](https://nextui.org/)
* @octokit/auth
* @react-oauth/google
* react-router-dom

### Back-end
* Express js
* Axios

### Installing
backend/
```
npm run install
```
client/
```
npm run install
```

### Env Please create .env file and have the following values
backed/.env
```
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```
client/.env
```
VITE_GITHUB_CLIENT_ID=
VITE_GOOGLE_CLIENT_ID=
```

### Running app
backend/
```
npm run dev
```
client/
```
npm run dev
```

<hr>

### Command for creating client docker image
```
cd client
docker build -t my-client:v1.0 .
```
### Command for creating backend docker image
```
cd backend
docker build -t my-backend:v1.0 .
```
