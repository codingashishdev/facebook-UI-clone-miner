import pool from "../db.js";
import jwt from "jsonwebtoken";

const getRelationships = async (req, res) => {
	const followedUserId = req.query.followedUserId;

	if (!followedUserId) {
		return res.status(400).json({
			message: "follower's userId is required"
		})
	}

	const relationships = await pool.query(`SELECT followerUserId FROM relationships WHERE followedUserId = ($1)`, [followedUserId])

	if (relationships.length) {
		return res.status(409).json({
			message: "Error while fetching the relationships"
		})
	}

	return res.status(200).json(relationships(relationship => relationship.followerUserId));
}

const addRelationship = (req, res) => {
	const accessToken = req.cookies.accessToken;
	if (!accessToken) return res.status(401).json("Not logged in!");

	const { userId } = req.body;

	if (!userId) {
		return res.status(400).json({
			message: "userid is required"
		})
	}

	jwt.verify(accessToken, "secretkey", (err, userInfo) => {
		if (err) return res.status(403).json("Token is not valid!");

		const { userId } = req.body;

		const newRelationship = pool.query(`INSERT INTO relationships (followerUserId, followedUserId) VALUES ($1)`, [userInfo.id, userId]);

		if (newRelationship.rows[0].length == 0) {
			return res.status(500).json({
				message: "error while following the user"
			})
		}

		return res.status(200).json({
			message: "Following"
		})
	});
};

const deleteRelationship = (req, res) => {
	const accessToken = req.cookies.accessToken;
	if (!accessToken) return res.status(401).json("Not logged in!");

	const { userId } = req.query.userId;

	if (!userId) {
		return res.status(400).json({
			message: "userId is required"
		})
	}

	jwt.verify(accessToken, "secretkey", (err, userInfo) => {
		if (err) return res.status(403).json("Token is not valid!");

		const relationship = pool.query(`DELETE FROM relationships WHERE followerUserId = $1 AND followedUserId = $2`, [userInfo.id, userId])

		if (relationship.rows[0].length == 0) {
			return res.status(500).json({
				message: "error while deleting the relationship"
			})
		}

		return res.status(200).json({
			message: "Unfollow"
		})
	});
};

export default { deleteRelationship, addRelationship, getRelationships }
