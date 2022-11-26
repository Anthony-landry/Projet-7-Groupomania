let multer = require("multer");
let path = require("path");

export const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.resolve(__dirname, "../../../uploads"));
	},
	filename: (req, file, cb) => {
		const name = Date.now() + path.extname(file.originalname);
		req.body.nameFile = name;
		cb(null, name);
	},
});
export const fileFilter = (req, file, cb) => {
	if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
		cb(null, true);
	} else {
		cb(null, false);
	}
};
