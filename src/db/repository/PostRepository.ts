import { EntityRepository, AbstractRepository } from "typeorm";
import { Post } from "../entity/post";
import { Subscribe } from "../entity/subscribe";

@EntityRepository(Post)
class PostRepository extends AbstractRepository<Post> {
  //postid가 주어졌을 때 해당 포스트 반환
  public findById(id: number): Promise<Post | undefined> {
    return this.repository.findOne({ id });
  }
  //쿼리스트링으로 주어진 조건으로 포스트 배열 반환
  public findByQuery(
    id: number,
    limit: number,
    offset: number,
    subscribe: string
  ): Promise<Post[] | undefined> {
    return this.repository
      .createQueryBuilder("post")
      .where(qb => {
        const subQuery =
          subscribe === null
            ? qb
                .subQuery()
                .select("subscribe.website")
                .from(Subscribe, "subscribe")
                .where("subscribe.user.id = :userId")
                .getQuery()
            : qb
                .subQuery()
                .select("subscribe.website")
                .from(Subscribe, "subscribe")
                .where("subscribe.user.id = :userId")
                .andWhere("subscribe.website = :subscribeName", { subscribe })
                .getQuery();
        return "post.website IN " + subQuery;
      })
      .setParameter("userId", id)
      .orderBy("post.createdAt")
      .limit(limit)
      .offset(offset)
      .getMany();
  }
}

export default PostRepository;
