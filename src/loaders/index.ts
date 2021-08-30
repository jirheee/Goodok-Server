import expressLoader from "./express";
import ormLoader from "./typeorm";
import Logger from "./logger";

export default async ({ expressApp }) => {
  Logger.info("Load start");
  await ormLoader();
  Logger.info("Orm loaded");

  expressLoader({ app: expressApp });
  Logger.info("Express loaded");
};
