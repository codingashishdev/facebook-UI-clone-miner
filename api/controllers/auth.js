import { pool } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {

	try {
		const { username, email, password, name } = req.body;

		if (!username || !email || !password || !name) {
			return res.status(400).json({
				message: "All the fields are required."
			})
		}

		const oldUser = await pool.query(`SELECT * FROM users WHERE username = ($1)`, [username])

		if (oldUser) {
			return res.status(409).json({
				message: "User already exists!!"
			})
		}

		const saltRounds = 10;
		const salt = bcrypt.genSaltSync(saltRounds)
		const hashedPassword = bcrypt.hashSync(password, salt)

		const newUser = await pool.query(`INSERT INTO users (username, password, email, name) VALUES ($1, $2, $3, $4) RETURNING username`, [username, hashedPassword, email, name]);

		res.status(201).json({
			message: "user created successfully",
			username: newUser.rows[0].username
		})
	} catch (error) {
		//checking for any duplicate users
		if (error.code === "23505") {
			return res.status().json({
				message: "Username already exists."
			})
		}

		res.status(500).json({
			message: "Internal server error"
		})
	}
}

const login = async (req, res) => {
	try {
		const { username, password } = req.body

		if (!username || !password) {
			res.status(400).json({
				message: "Username or password both are required"
			})
		}

		const user = await pool.query(`SELECT * FROM users WHERE username = $1`, [username])

		if (user.rows.length == 0) {
			return res.status().json({
				message: "Invalid username or password"
			})
		}

		const isValid = await bcrypt.compare(password, user.rows[0].password)

		if (!isValid) {
			return res.status(401).json({
				message: "Invalid username or password"
			})
		}

		const token = jwt.sign({ id: user.data[0].id }, "secretkey");

		res.cookie("accessToken", token, { httpOnly: true, })
			.status(200)
			.json({
				id: user.rows[0].id,
				username: user.rows[0].username,
				name: user.rows[0].name
			});
	} catch (error) {
		res.status(500).json({
			message: "Internal server error"
		})
	}
}

const logout = (req, res) => {
	res.clearCookie("accessToken", {
		secure: true,
		sameSite: "none"
	}).status(200).json("User has been logged out.")
};


export default { register, login, logout };
