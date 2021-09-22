import { AbstractRepository, EntityRepository } from "typeorm";
import { Subscribe } from "../entity/subscribe";

@EntityRepository(Subscribe)
class SubscribeRepository extends AbstractRepository<Subscribe> {}
