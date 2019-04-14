import routes from "./routes";
import multer from "multer";

export const uploadVideo = multer({ dest: "uploads/videos/" }).single(
  "videoFile"
);

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Youtube Clone";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1
  };
  next();
};
