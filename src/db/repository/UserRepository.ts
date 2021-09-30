import { AbstractRepository, EntityRepository } from "typeorm";
import { User } from "../entity/user";

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
  public saveUser(email: string, password: string): Promise<User> {
    return this.repository.save({ email, password });
  }
  public drop() {
    return this.repository
      .createQueryBuilder()
      .delete()
      .where("id > 0")
      .execute();
  }
  public updateUser() {}
  public updateSearch() {}
  public getUser() {}
}

export default UserRepository;
