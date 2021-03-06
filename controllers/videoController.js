import routes from '../routes';
import Video from '../models/Video';

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    return res.render('home', {
      pageTitle: 'Home',
      videos
    });
  } catch (e) {
    console.error(e);
    return res.render('home', {
      pageTitle: 'Home',
      db: []
    });
  }
};

export const search = async (req, res) => {
  const { term: searchingBy } = req.query;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: 'i' }
    });
  } catch (e) {
    console.log(e);
  }

  return res.render('search', { pageTitle: 'Search', searchingBy, videos });
};

export const videos = (req, res) =>
  res.render('videos', {
    pageTitle: 'Videos'
  });

export const getUpload = (req, res) =>
  res.render('upload', {
    pageTitle: 'Upload'
  });
export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path }
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description
  });
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    res.render('videoDetail', {
      pageTitle: `${video.title}`,
      video
    });
  } catch (e) {
    console.log(e);
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description }
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (e) {
    console.log(e);
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    res.render('editVideo', { pageTitle: `Edit ${video.title}`, video });
  } catch (e) {
    res.redirect(routes.home);
  }
};
export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    await Video.findByIdAndDelete({ _id: id });
  } catch (e) {
    console.log(e);
  } finally {
    res.redirect(routes.home);
  }
};
