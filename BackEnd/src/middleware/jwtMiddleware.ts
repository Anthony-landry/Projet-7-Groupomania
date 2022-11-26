// Appel du module externe jsonwebtoken.
const jsonwebtoken = require("jsonwebtoken");

export const checkJwt = (req, res, next) => {
	let token = req.headers["x-access-token"];
	if (!token)
		return res.status(401).send({ auth: false, message: "No token provided." });

	jsonwebtoken.verify(
		token,
		process.env.JWT_SECRETKEY,
		function (err, decoded) {
			if (err)
				return res
					.status(500)
					.send({ auth: false, message: "Failed to authenticate token." });
			req.userId = decoded.userId;
			next();
		}
	);
};
