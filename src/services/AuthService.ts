import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import config from "@/config";
import User from "@/db/entity/user";
import Subscribe from "@/db/entity/subscribe";

export interface UserPayloadInterface {
  id: number;
}

export interface ResponseInterface {
  email: string;
  search_list: string[] | null;
  subscribe_list: Subscribe[] | null;
}

class AuthService {
  private SECRET: string = config.jwt.jwtSecret;
  private TOKEN_EXPIRE: string = config.jwt.jwtExpire;

  public generateToken = (payload: UserPayloadInterface) =>
    jwt.sign(payload, this.SECRET, { expiresIn: this.TOKEN_EXPIRE });

  public addAccessToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user = req.user as User;

    const payload: UserPayloadInterface = {
      id: user.id
    };

    const information: ResponseInterface = {
      email: user.email,
      search_list: user.search_list,
      subscribe_list: user.subscribe_list
    };

    const token = await this.generateToken(payload);

    return res.status(200).json({ user: { ...information, token } });
  };

  public checkAccessToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const authHeader: string = req.headers["authorization"];
    const token: string | boolean = !!authHeader
      ? authHeader.split(" ")[1]
      : false;
    if (!token) {
      next("wrong token format or token is not sended");
    }
    jwt.verify(token, this.SECRET, (error, user) => {
      if (error) {
        next(error);
      }
      req.user = user;
      next();
    });
  };
}

export default AuthService;
