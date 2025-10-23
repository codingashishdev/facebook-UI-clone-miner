import pool from "../db.js";
import jwt from "jsonwebtoken";
import moment from "moment";

const getComments = async (req, res) => {
	const comments = await pool.query(`SELECT c.*, u.id AS userId, name, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId)
    WHERE c.postId = ? ORDER BY c.createdAt DESC`);

	if (comments.rows[0].length == 0) {
		return res.status(500).json({
			message: "No comments found!"
		})
	}

	return res.status(200).json(comments.rows[0].data);
};

const addComment = (req, res) => {
	const { desc, postId } = req.body;
	const accessToken = req.cookies.accessToken;
	if (!accessToken) return res.status(401).json("Not logged in!");

	jwt.verify(accessToken, "secretkey", (err, userInfo) => {
		if (err) return res.status(403).json("Token is not valid!");

		const createdAt = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

		const newComment = pool.query(`INSERT INTO comments (desc, createdAt, userId, postId) VALUES ($1, $2, $3, $4) RETURNING userInfo`, [desc, createdAt, userInfo.id, postId])

		if (newComment.rows[0].length == 0) {
			return res.status().json({
				message: "Error adding new comment"
			})
		}

		return res.status(200).json({
			message: "Comment has been created"
		})
	});
};

export const deleteComment = (req, res) => {
	const token = req.cookies.access_token;
	if (!token) return res.status(401).json("Not authenticated!");

	jwt.verify(token, "jwtkey", (err, userInfo) => {
		if (err) return res.status(403).json("Token is not valid!");

		const commentId = req.params.id;
		const q = "DELETE FROM comments WHERE `id` = ? AND `userId` = ?";

		pool.query(q, [commentId, userInfo.id], (err, data) => {
			if (err) return res.status(500).json(err);
			if (data.affectedRows > 0) return res.json("Comment has been deleted!");
			return res.status(403).json("You can delete only your comment!");
		});
	});
};

export default { getComments, deleteComment, addComment }