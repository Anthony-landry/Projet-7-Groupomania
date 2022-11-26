import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
	CreateDateColumn,
} from "typeorm";
import { user } from "./user";

@Entity()
export class post {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column({ nullable: true })
	picture: string;

	@Column()
	userId: number;

	@Column()
	nbOfLike: number;

	@CreateDateColumn()
	creationDate: Date;

	@ManyToOne(() => user, (user) => user.id, {
		nullable: false,
		cascade: true,
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "userId" })
	user: user;

	isLikedByMe: boolean;
}
