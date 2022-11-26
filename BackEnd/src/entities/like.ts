import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
} from "typeorm";
import { post } from "./post";
import { user } from "./user";

@Entity()
export class like {
	@PrimaryGeneratedColumn()
	id: number;


	@Column()
	postId: number;


	@Column()
	userId: number;

	@ManyToOne(() => user, (user) => user.id, {
		nullable: false,
		cascade: true,
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "userId" })
	user: user;
}
