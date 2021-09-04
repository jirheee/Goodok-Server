import { Column, Entity, OneToMany } from "typeorm";
import { Base } from "./base";
import { Post } from "./post";

@Entity()
export class Website extends Base {
    @Column({ type: "text" })
    domain: string;

    @OneToMany(() => Post, post => post.website)
    posts: Post[];
}
