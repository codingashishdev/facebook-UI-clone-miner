import pool from "../db.js";
import jwt from "jsonwebtoken";
import moment from "moment";

const getPosts = (req, res) => {
	const userId = req.query.userId;

	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json("Not logged in!");

	jwt.verify(token, "secretkey", (err, userInfo) => {
		if (err) return res.status(403).json("Token is not valid!");

		let query;

		if (userId === 'undefined') {
			query = `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
    LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId= ? OR p.userId =?
    ORDER BY p.createdAt DESC`;
		}
		else {
			query = `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`
		}

		const values =
			userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

		pool.query(q, values, (err, data) => {
			if (err) return res.status(500).json(err);
			return res.status(200).json(data);
		});
	});
};

const addPost = (req, res) => {
	const accessToken = req.cookies.accessToken;
	if (!accessToken) return res.status(401).json("Not logged in!");

	const { desc, img } = req.body

	jwt.verify(accessToken, "secretkey", (err, userInfo) => {
		if (err) return res.status(403).json("Token is not valid!");

		const createdAt = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")

		const post = pool.query(`INSERT INTO posts (desc, img, createdAt, userId) VALUES ($1, $2, $3, $4) RETURNING userId`, [desc, img, createdAt, userInfo.id])

		if (!post) {
			return res.status(500).json({
				message: "Error while adding post"
			})
		}

		return res.status(200).json({
			message: "Post has been created"
		})
	});
};

const deletePost = (req, res) => {
	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json("Not logged in!");

	jwt.verify(token, "secretkey", (err, userInfo) => {
		if (err) return res.status(403).json("Token is not valid!");

		const q =
			"DELETE FROM posts WHERE `id`=? AND `userId` = ?";

		pool.query(q, [req.params.id, userInfo.id], (err, data) => {
			if (err) return res.status(500).json(err);
			if (data.affectedRows > 0) return res.status(200).json("Post has been deleted.");
			return res.status(403).json("You can delete only your post")
		});
	});
};

export default { getPosts, addPost, deletePost }
