import PostRepository from "@/db/repository/PostRepository";
import { NextFunction, Request, Response } from "express";
import { Post } from "../db/entity/post";



class PostService {
  private postRepository: PostRepository;

  constructor(postRepository: PostRepository) {
    this.postRepository = postRepository;
  }

  public fromId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postid : string = req.params.postid;
      const post : Promise<Post | undefined>  = await this.postRepository.findById(postid);

      if (post === undefined) {
        next(`Find Post Error: no such post ${postid}`);
      }
      console.log(post);
      res
        .json({post: post})
        .status(200);
      next();
    } catch (e) {
      next(`Find Post Error: ${e}`);
    }
  };

  public fromQuery = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postid : string = req.params.postid;
      const post : Promise<Post | undefined>  = await this.postRepository.findById(postid);

      if (post === undefined) {
        next(`Find Post Error: no such post ${postid}`);
      }
      console.log(post);
      res
        .json({post: post})
        .status(200);
      next();
    } catch (e) {
      next(`Find Post Error: ${e}`);
    }
  };
}

export default PostService;
