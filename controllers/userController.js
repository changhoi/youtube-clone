import routes from '../routes';

export const getJoin = (req, res) => {
  console.log(req.body);
  res.render('join', {
    pageTitle: 'GetJoin'
  });
};

export const postJoin = (req, res) => {
  const {
    body: {
      name,
      email,
      password,
      password2
    }
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render('join', {
      pageTitle: 'join'
    });
  } else {
    // TODO : Register User
    // TODO : Log user In
    res.redirect(routes.home);
  }
  res.render('join', {
    pageTitle: 'PostJoin'
  });
};

export const getLogin = (req, res) =>
  res.render('login', {
    pageTitle: 'Login'
  });
export const postLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  // TODO: Process Logout
  res.redirect(routes.home);
};

export const users = (req, res) => res.render('users', {
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