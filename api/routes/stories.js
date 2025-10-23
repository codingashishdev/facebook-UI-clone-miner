import express from "express";
import storyController from "../controllers/story.js";

const router = express.Router()

router.get("/", storyController.getStories)
router.post("/", storyController.addStory)
router.delete("/:id", storyController.deleteStory)


export default router
