import { SubscribeRepository } from "@/db/repository/SubscribeRepository";
import SubscribeService from "@/services/SubscribeService";
import { Router } from "express";
import { getCustomRepository } from "typeorm";

const route = Router();

export default (app: Router) => {
  app.use("/subscribe", route);

  const service = new SubscribeService(
    getCustomRepository(SubscribeRepository)
  );
  //   route.get()
};
