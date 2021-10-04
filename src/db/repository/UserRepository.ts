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
  public findOneByEmail(email:string) : Promise<User | undefined>{
    return this.repository.findOne({email});
  }
  public saveUserInfo(email:string, password:string) : Promise<User>{
    const newUser = new User();
    newUser.email = email;
    newUser.password = password;
    // 나머지는 비워두면 되나?
    //  newUser.searchlists = ;
    //  newUser.subscribes = ;
    //  newUser.bookmarks = ;
    return this.repository.save(newUser);
  }
  public updateUser() {}
  public updateSearch() {}
  public getUser() {}
}

export default UserRepository;
