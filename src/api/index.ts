import { Router } from "express";

import user from "./routes/user";
import post from "./routes/post";
import auth from "./routes/auth";
import subscribe from "./routes/subscribe";

export default () => {
  const app = Router();

  auth(app);
  user(app);
  post(app);
  subscribe(app);

  return app;
};
