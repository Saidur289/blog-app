import { Router } from "express";
import { postController } from "./post.controller";
import auth, { UserRole } from "../../middleware/auth";


const router = Router()
router.get("/my-posts", auth(UserRole.ADMIN, UserRole.USER), postController.getMyPost)
router.get('/', postController.getAllPost)
router.get("/:id", postController.getPostById)
router.patch("/:postId", auth(UserRole.ADMIN, UserRole.USER), postController.updatePost)

router.post('/', auth(UserRole.USER, UserRole.ADMIN) ,postController.createPost)
export const postRoutes = router