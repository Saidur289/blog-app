import { Router } from "express";
import { CommentsController } from "./comments.controller";
import auth, { UserRole } from "../../middleware/auth";


const router = Router()
router.post("/", auth(UserRole.USER, UserRole.ADMIN),  CommentsController.createComment)
router.get("/:commentId", auth(UserRole.USER, UserRole.ADMIN),  CommentsController.getCommentById)
router.get("/author/:authorId", auth(UserRole.USER, UserRole.ADMIN),  CommentsController.getCommentByIdAuthor)
router.patch("/:commentId", auth(UserRole.USER, UserRole.ADMIN),  CommentsController.updateComment)
router.delete("/:commentId", auth(UserRole.USER, UserRole.ADMIN),  CommentsController.deleteComment)

export const CommentsRouter = router