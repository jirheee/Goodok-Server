import { Column, Entity, OneToOne, JoinColumn } from "typeorm";
import { Base } from "./base";
import { Image } from "./image"

@Entity()
export class Post extends Base {
    @Column({ type: "text" })
    title: string;
  
    @Column({ type: "longtext" })
    body: string;

    @Column({ type: "text" })
    url: string;

    @OneToOne(() => Image)
    @JoinColumn()
    imageSrc: Image;
}
