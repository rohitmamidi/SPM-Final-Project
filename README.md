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
backend/.env
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
docker build -t my-client:v2.0 . -f Dockerfile.txt
```
### Command for creating client docker container
```
docker run --name clientcontainer -p 5173:5173 my-client:v2.0
```
### Command for creating backend docker image
```
cd backend
docker build -t my-backend:v1.0 . -f Dockerfile.txt
```
### Command for creating backend docker container
```
docker run --name backendcontainer -p 3001:3001 my-backend:v1.0
```
###Command for already existing client container
```
docker start clientcontainer
```
###Command for already existing backend container
```
docker start backendcontainer
```
###Command for removing client container
```
docker rm /clientcontainer
```
###Command for removing backend container
```
docker rm /backendcontainer
```
