import { authMethods } from "./controller/authController";
import { likeMethods } from "./controller/likeController";
import { postMethods } from "./controller/postController";
import { Router } from "express";
import { checkJwt } from "./middleware/jwtMiddleware";
import { fileFilter, storage } from "./middleware/multerMiddleware";
const router = Router();
const multer = require("multer");
const upload = multer({ storage: storage, fileFilter: fileFilter });

// auth routes
router.post("/auth/signup", authMethods.signUp);
router.post("/auth/login", authMethods.login);
// post routes
router.get("/post/getall", checkJwt, postMethods.getAll);
router.post("/post/create", upload.single("image"), postMethods.create);
router.put("/post/update", upload.single("image"), postMethods.update);
router.post("/post/delete", checkJwt, postMethods.delete);
// like route
router.post("/like/post", checkJwt, likeMethods.likePost);

export default router;
