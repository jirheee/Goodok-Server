import { Router } from "express";
import { getCustomRepository } from "typeorm";

const route = Router();

export default (app: Router) => {
  app.use("/user", route);
  const authService: AuthService = new AuthService();
  const userService: UserService = new UserService(
    getCustomRepository(UserRepository)
  );
  route.post("/login", userService.login, authService.newAccessToken);
  route.post("/", userService.signup);
  route.put(
    "/profile",
    authService.checkAccessToken,
    userService.changeProfile,
    authService.newAccessToken
  );
  route.put(
    "/search_list",
    authService.checkAccessToken,
    userService.changeSearch
  );
  route.delete("/", authService.checkAccessToken, userService.deleteUser);
};
