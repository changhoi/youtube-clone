import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    console.log(videos);

    return res.render("home", {
      pageTitle: "Home",
      db: videos
    });
  } catch (e) {
    console.error(e);
    return res.render("home", {
      pageTitle: "Home",
      db: []
    });
  }
};

export const search = (req, res) => {
  const { term: searchingBy } = req.query;

  return res.render("search", {});
};

export const videos = (req, res) =>
  res.render("videos", {
    pageTitle: "Videos"
  });

export const getUpload = (req, res) =>
  res.render("upload", {
    pageTitle: "Upload"
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
  console.log(newVideo);
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = (req, res) =>
  res.render("videoDetail", {
    pageTitle: "Video Detail"
  });
export const editVideo = (req, res) =>
  res.render("editVideo", {
    pageTitle: "Edit Video"
  });
export const deleteVideo = (req, res) =>
  res.render("deleteVideo", {
    pageTitle: "Delete Video"
  });
