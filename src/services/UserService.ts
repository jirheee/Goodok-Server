import UserRepository from "@/db/repository/UserRepository";
import { NextFunction, Request, Response } from "express";
//Login 만들 때 req.user에 {id:~~~,email:~~~~,search_list:~~~~}이렇게 넣어주면 됨
interface ChangeProfileRequest {
  email?: string;
  password?: string;
}

interface CurrentUserResponse {
  email?: string;
  search_list?: string;
}

class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public changeProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId: number = req.userPayload.id;
      const { email, password }: ChangeProfileRequest = req.body.user;
      //req.user에는 id,email,searchlists 들어있음
      req.user = await this.userRepository.updateUser(userId, email, password);

      next();
    } catch (e) {
      next(`User Update Error: ${e}`);
    }
  };

  public changeSearchlist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId: number = req.userPayload.id;
      const search_list: String[] = req.body.search_list;
      //req.user에는 id,email,searchlists 들어있음
      req.user = await this.userRepository.updateSearch(userId, search_list);

      next();
    } catch (e) {
      next(`Search List Update Error: ${e}`);
    }
  };

  public getCurrentUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId: number = req.userPayload.id;
      const { email, search_list }: CurrentUserResponse =
        await this.userRepository.getUser(userId);
      res
        .json({
          user: {
            email: email,
            search: search_list ?? null
          }
        })
        .status(200);
      next();
    } catch (e) {
      next(`Search List Update Error: ${e}`);
    }
  };
}

export default UserService;
