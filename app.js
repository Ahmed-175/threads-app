import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connetMongodb from "./database/connectMongodb.js";
import authRoutes from "./routes/authRoutes.routes.js";
import postRoutes from "./routes/postRoutes.routes.js";
import commentRoutes from "./routes/commentRoutes.routes.js";
import userRoutes from "./routes/userRoutes.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/user", userRoutes);

// app.use("/api/notification", notificationRoutes);
// app.use("/api/group", groupRoutes);

app.listen(process.env.PORT, () => {
  console.log(" server running on port :", process.env.PORT);
  connetMongodb();
});
