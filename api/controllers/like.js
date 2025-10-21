import { pool } from "../db.js";
import jwt from "jsonwebtoken";

const getLikes = (req, res) => {
	const postId = req.query.postId;

	if (!postId) {
		return res.status(400).json({
			message: "postId is not found"
		})
	}

	const likes = pool.query(`SELECT userId FROM likes WHERE postId = ($1)`, [postId])

	return res.status(200).json({
		data: likes.map(like => like.userId)
	})
}

const addLike = (req, res) => {
	const accessToken = req.cookies.accessToken;
	if (!accessToken) return res.status(401).json("Not logged in!");

	const { postId } = req.body;

	jwt.verify(accessToken, "secretkey", async (err, userInfo) => {
		if (err) return res.status(403).json("Token is not valid!");

		const addedLike = await pool.query(`INSERT INTO likes (userId, postId) VALUES ($1, $2) RETURNING userInfo.username`, [userInfo.id, postId])

		if (addedLike.row[0].length == 0) {
			return res.status(500).json({
				message: "Error while adding like"
			})
		}

		return res.status(200).json({
			message: "Post has been liked"
		})
	});
};

const deleteLike = (req, res) => {
	const accessToken = req.cookies.accessToken;
	if (!accessToken) return res.status(401).json("Not logged in!");

	const { postId } = req.query;

	jwt.verify(accessToken, "secretkey", (err, userInfo) => {
		if (err) return res.status(403).json("Token is not valid!");

		const likeToDelete = pool.query(`DELETE FROM likes WHERE userId = $1 AND postId = $2`, [userInfo.id, postId]);

		if (!likeToDelete) {
			return res.status().json({
				message: "Error while deleting the like"
			})
		}

		return res.status(500).json({
			message: "Post has been disliked"
		})
	});
};

export default { getLikes, addLike, deleteLike };
