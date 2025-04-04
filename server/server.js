import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

import authRouter from "../server/routes/authRoutes.js";
import postRouter from "./routes/postRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
import { setupSocket } from "./socket.js";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',                    // adjust for production
        methods: ['GET', 'POST']
    }
});

// MiddleWare
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/auth", authRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);

// Connect To MongoDB and starting server
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log(" ✅ Connected to MongoDB!");
    server.listen(process.env.PORT || 5000, () => {
        console.log(`🚀 Server is running on port ${process.env.PORT || 5000}`);
      });
      setupSocket(io);
})
.catch(err => console.error('❌ MongoDB connection error:', err));

