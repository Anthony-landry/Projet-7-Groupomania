import { getManager, In } from "typeorm";
import { Request, Response } from "express";
import { post } from "../entities/post";
import { user } from "../entities/user";
import { role } from "../entities/role";
import { like } from "../entities/like";

export class postController {
	public async getAll(request: Request, response: Response) {
		const postRepository = getManager().getRepository(post);
		const likeRepository = getManager().getRepository(like);

		const userId = parseInt(request.query.userId.toString());

		const postFinds = await postRepository.find({
			order: { creationDate: "DESC" },
			relations: ["user"],
		});

		let arrOfPostIds = postFinds.map((el: post) => el.id);
		const likes = await likeRepository.find({
			where: { postId: In(arrOfPostIds) },
		});
		postFinds.forEach((post: post) => {
			if (
				likes.find(
					(like: like) => like.postId === post.id && like.userId === userId
				)
			) {
				post.isLikedByMe = true;
			} else {
				post.isLikedByMe = false;
			}

			delete post.user.password;
		});

		response.send(postFinds);
	}

	public async create(request: Request, response: Response) {
		const postToInsert = request.body;
		postToInsert.creationDate = new Date();
		postToInsert.nbOfLike = 0;
		postToInsert.picture = request.body.nameFile
		const postRepository = getManager().getRepository(post);
		console.log(postToInsert)
		const result = await postRepository.save(postToInsert);
		response.send(result);
	}

	public async update(request: Request, response: Response) {
		const postRepository = getManager().getRepository(post);
		const userRepository = getManager().getRepository(user);

		const userId = request.body.userId;
		const postId = request.body.id;


		const userFind = await userRepository.findOne({
			where: { id: userId },
			relations: ["role"],
		});
		const isAdmin =
			userFind?.role?.find((el: role) => el.name === "admin") !== undefined;

		const postFind = await postRepository.findOne({
			where: { id: postId },

		});
		if (postFind.userId == userId || isAdmin) {
			const postToUpdate = request.body;
			postToUpdate.picture = request.body.nameFile
			postToUpdate.id = parseInt(postToUpdate.id);
			console.log(postToUpdate)
			const result = await postRepository.save(postToUpdate);
			response.send(result);
		} else {
			response.status(400).json({ message: "Vous n'avez pas les droits" });
		}
	}

	public async delete(request: Request, response: Response) {
		const postRepository = getManager().getRepository(post);
		const userRepository = getManager().getRepository(user);

		const userId = request.body.userId;
		const postId = request.body.id;

		const userFind = await userRepository.findOne({
			where: { id: userId },
			relations: ["role"],
		});

		const isAdmin =
			userFind?.role?.find((el: role) => el.name === "admin") !== undefined;

		const postFind = await postRepository.findOne({
			where: { id: postId },
			select: ["userId"],
		});

		if (postFind.userId === userId || isAdmin) {
			const result = await postRepository.delete({ id: postId });
			response.send(result);
		} else {
			response.status(400).json({ message: "Vous n'avez pas les droits" });
		}
	}
}

export const postMethods = new postController();
