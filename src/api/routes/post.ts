import { Post } from "@/db/entity/post";
import { Router } from "express";
import PostService from "@/services/PostService";
import PostRepository from "@/db/repository/PostRepository";
import { getCustomRepository } from "typeorm";
const route = Router();
const service : PostService = new PostService(getCustomRepository(PostRepository));
route.get("/",service.fromQuery);
route.get("/:postid",service.fromId);


export default (app: Router) => {
    app.use("/post", route);
  };