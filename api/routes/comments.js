import express from "express";
import commentController from "../controllers/comment.js";

const router = express.Router();

router.get("/", commentController.getComments);
router.post("/", commentController.addComment);
router.delete("/:id", commentController.deleteComment);

export default router;
