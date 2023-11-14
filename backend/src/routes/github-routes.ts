import express, { Request, Response, Router } from 'express';
import { getAccessToken, getCommits, getContributorActivity, getIssueResolutionTime, getPullRequestsTrends, getRepos, getUserData } from '../controllers/github-controller';

const router: Router = express.Router();

router.get('/accessToken', (req: Request, res: Response) => {
  const code = req.query.code;
  getAccessToken(code as string).then((resp) => res.json(resp));
});

router.get('/userData', (req: Request, res: Response) => {
  const accessToken = req.query.accessToken;
  getUserData(accessToken as string).then((resp) => res.json(resp));
});
router.get('/commits', (req: Request, res: Response) => {
  const owner = req.query.owner;
  const repo = req.query.repo;
  const accessToken = req.query.accessToken;
  getCommits(owner as string,repo as string,accessToken as string).then((resp) => res.json(resp));
});
router.get('/pullRequests', (req: Request, res: Response) => {
  const owner = req.query.owner;
  const repo = req.query.repo;
  const accessToken = req.query.accessToken;
  getPullRequestsTrends(owner as string,repo as string,accessToken as string).then((resp) => res.json(resp));

})
router.get('/resolutionTime', (req: Request, res: Response) => {
  const owner = req.query.owner;
  const repo = req.query.repo;
  const accessToken = req.query.accessToken;
  getIssueResolutionTime(owner as string,repo as string,accessToken as string).then((resp) => res.json(resp));

})
router.get('/contributorActivity', (req: Request, res: Response) => {
  const owner = req.query.owner;
  const repo = req.query.repo;
  const accessToken = req.query.accessToken;
  getContributorActivity(owner as string,repo as string,accessToken as string).then((resp) => res.json(resp));

})
router.get('/repos', (req: Request, res: Response) => {
  const username = req.query.username;
  const accessToken = req.query.accessToken;
  getRepos(username as string, accessToken as string).then((resp) => res.json(resp));
})
export default router;
