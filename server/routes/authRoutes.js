import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";

const authRouter = Router();

// Register Route

authRouter.post("/register", registerUser);


// Login Route 

authRouter.post("/login", loginUser);

export default authRouter;
