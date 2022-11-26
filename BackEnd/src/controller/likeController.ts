import { getManager } from "typeorm";
import { Request, Response } from "express";
import { like } from "../entities/like";
import { post } from "../entities/post";

export class likeController {
	public async likePost(request: Request, response: Response) {
		const likeRepository = getManager().getRepository(like);
		const postRepository = getManager().getRepository(post);

		const postId = request.body.postId;
		const userId = request.body.userId;

		const likeFind = await likeRepository.findOne({
			where: { postId: postId, userId: userId },
		});
		const postFind = await postRepository.findOne({ where: { id: postId } });

		if (!likeFind) {
			postFind.nbOfLike++;
			await likeRepository.save({ userId, postId });
		} else {
			postFind.nbOfLike--;
			await likeRepository.delete({ userId: userId, postId: postId });
		}

		const postUpdated = await postRepository.save(postFind);

		response.send(postUpdated).status(200);
	}
}

export const likeMethods = new likeController();
