import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import { addComment, getCommentsByPost } from "../controllers/comment.controller.js";

const commentRouter = Router();

commentRouter.post('/', authorize, addComment);
commentRouter.get('/:postId', getCommentsByPost);


export default commentRouter;