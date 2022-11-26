import { Request, Response } from "express";
import { getManager } from "typeorm";
import { user } from "../entities/user";

const validator = require("validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jsonWebToken = require("jsonwebtoken");

//signup

export class authController {
	public async signUp(request: Request, response: Response) {
		const userRepository = getManager().getRepository(user);
		const email = request.body.user.email;
		const password = request.body.user.password;
		const pseudo = request.body.user.pseudo;

		if (email == null || email == "" || !validator.isEmail(email)) {
			return response
				.status(400)
				.json({ message: "Veuillez renseigner l'email" });
		}

		const userFind = await userRepository.find({ where: { email: email } });
		console.log(userFind);
		if (userFind.length > 0) {
			return response.status(400).json({ message: "email déjà présent" });
		} else {
			const hashedPassword = await bcrypt.hash(password, saltRounds);
			const userSaved = await userRepository.save({
				pseudo: pseudo,
				password: hashedPassword,
				email: email,
				role: [{ id: 1, name: "user" }],
			});

			let token = jsonWebToken.sign(
				{ userId: userSaved.id },
				process.env.JWT_SECRETKEY,
				{
					expiresIn: "24h",
				}
			);

			return response.status(200).send({
				message: "Utilisateur créé et sauvegardé !",
				userId: userSaved.id,
				token: token,
				role: userSaved.role,
			});
		}
	}

	//signin

	public async login(request: Request, response: Response) {
		let email = request.body.email;
		let password = request.body.password;

		const userRepository = getManager().getRepository(user);

		const userFind = await userRepository.findOne({
			where: { email: email },
			relations: ["role"],
		});

		bcrypt.compare(password, userFind.password).then((passwordIsValid) => {
			if (passwordIsValid) {
				delete userFind.password;

				let token = jsonWebToken.sign(
					{ userId: userFind.id },
					process.env.JWT_SECRETKEY,
					{
						expiresIn: "24h",
					}
				);

				return response.status(200).send({
					userId: userFind.id,
					token: token,
					role: userFind.role,
				});
			}
		});
	}
}

export const authMethods = new authController();
