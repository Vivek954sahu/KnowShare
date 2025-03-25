import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import { createPost, getAllPosts, getPostById }from "../controllers/post.controller.js";


const postRouter = Router();

postRouter.post('/', authorize, createPost);
postRouter.get('/', getAllPosts);
postRouter.get('/:id', getPostById);


export default postRouter;