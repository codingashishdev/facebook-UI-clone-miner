import jwt from "jsonwebtoken";
import moment from "moment";
import { pool } from "../db.js";
import { add } from "nodemon/lib/rules/index.js";

const getStories = (req, res) => {
	const accessToken = req.cookies.accessToken;
	if (!accessToken) return res.status(401).json("Not logged in!");

	jwt.verify(accessToken, "secretkey", (err, userInfo) => {
		if (err) return res.status(403).json("Token is not valid!");

		const stories = pool.query(`SELECT s.*, name FROM stories AS s JOIN users AS u ON (u.id = s.userId)
    LEFT JOIN relationships AS r ON (s.userId = r.followedUserId AND r.followerUserId= $1) LIMIT 4`, [userInfo.id])

		if (stories.rows[0].length == 0) {
			return res.status(409).json({
				message: "Error while fetching the stories"
			})
		}

		return res.status(200).json({ stories })
	});
};

const addStory = (req, res) => {
	const { img } = req.body;

	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json("Not logged in!");

	jwt.verify(token, "secretkey", (err, userInfo) => {
		if (err) return res.status(403).json("Token is not valid!");

		const createdAt = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")

		const story = pool.query(`INSERT INTO stories (img, createdAt, userId) VALUES ($1, $2, $3)`, [img, createdAt, userInfo.id]);

		if (story.rows[0].length == 0) {
			return res.status(400).json({
				message: "Error while adding story"
			})
		}

		return res.status(200).json({
			message: "Story has been added"
		})
	});
};

const deleteStory = (req, res) => {

	const { id } = req.params.id

	if (!id) {
		return res.status(400).json({
			message: "Id is required"
		})
	}

	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json("Not logged in!");

	jwt.verify(token, "secretkey", (err, userInfo) => {
		if (err) return res.status(403).json("Token is not valid!");

		const deleteStory = pool.query(`DELETE FROM stories WHERE id = ($1) AND userId = ($2)`, [id, userInfo.id])

		if (deleteStory.affectedRows == 0) {
			return res.status(500).json({
				message: "Error while deleting the story."
			})
		}

		return res.status(200).json({
			message: "Story has been deleted."
		})
	});
};

export default { addStory, getStories, deleteStory }
