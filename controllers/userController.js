import routes from '../routes';
import User from '../models/User';
import passport from 'passport';

export const getJoin = (req, res) => {
  res.render('join', {
    pageTitle: 'GetJoin'
  });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 }
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render('join', {
      pageTitle: 'join'
    });
  } else {
    try {
      const user = await User({
        name,
        email
      });
      await User.register(user, password);
      await next();
    } catch (e) {
      console.error(e);
    }
    // TODO : Register User
    // TODO : Log user In
  }
};

export const getLogin = (req, res) =>
  res.render('login', {
    pageTitle: 'Login'
  });
export const postLogin = passport.authenticate('local', {
  failureRedirect: routes.login,
  successRedirect: routes.home
});

export const githubLogin = passport.authenticate('github');

export const githubLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  callback
) => {
  const {
    _json: { id, avatar_url, name, email }
  } = profile;
  try {
    console.log(email);
    let user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
    } else {
      user = await User.create({
        email,
        name,
        githubId: id,
        avatarUrl: avatar_url
      });
    }
    return callback(null, user);
  } catch (error) {
    return callback(error);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const users = (req, res) =>
  res.render('users', {
    pageTitle: 'Users'
  });
export const userDetail = (req, res) =>
  res.render('userDetail', {
    pageTitle: 'User Detail'
  });
export const editProfile = (req, res) =>
  res.render('editProfile', {
    pageTitle: 'Edit Profile'
  });
export const changePassword = (req, res) =>
  res.render('changePassword', {
    pageTitle: 'Change Password'
  });
