import jwt from "jsonwebtoken";
import pool from "../db.js";

const getUser = (req, res) => {
    const userId = req.params.userId;
    const user = pool.query(`SELECT * FROM users WHERE id=$1`, [userId])

    if (user.rows[0].length == 0) {
        return res.status(409).json({
            message: "Error while fetching the user"
        })
    }

    const { password, ...info } = user.rows[0];
    return res.status(200).json({ info })
};

const updateUser = (req, res) => {
    const { name, city, website, coverPic, profilePic } = req.body

    if(!name || !city || !website || !coverPic || !profilePic){
        return res.status(400).json({
            message: "All the fields are required"
        })
    }

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const updatedUser = pool.query(`UPDATE users SET name=$1, city=$2, website=$3, profilePic=$4, coverPic=$5 WHERE id=$6`, [name, city, website, profilePic, coverPic, userInfo.id])    

        if(updateUser.affectedRows == 0){
            return res.status(500).json({
                message: "error while updating the user"
            })
        }

        if(updateUser.affectedRows > 0){
            return res.status(200).json({
                message: "Updated"
            })
        }
        else{
            return res.status(403).json({
                message: "You can update only your post!"
            })
        }
    });
};


export default { updateUser, getUser }