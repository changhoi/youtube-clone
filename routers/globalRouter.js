import express from 'express';
import routes from '../routes';
import { home, search } from '../controllers/videoController';
import passport from 'passport';
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  githubLogin,
  postGithubLogin
} from '../controllers/userController';
import { onlyPublic } from '../middlewares';

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

globalRouter.get(routes.github, githubLogin);

globalRouter.get(
  routes.githubCallback,
  passport.authenticate('github', { failureRedirect: routes.login }),
  postGithubLogin
);

export default globalRouter;
