import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["likes", post.id], () =>
    makeRequest.get("/likes?postId=" + post.id).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );
  const deleteMutation = useMutation(
    (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.id));
  };

  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };

  return (
    <div className="shadow-[0px_0px_25px_-10px_rgba(0,0,0,0.38)] rounded-[20px] bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
      <div className="p-5">
        <div className="flex items-center justify-between relative">
          <div className="flex gap-5">
            <img src={"/upload/" + post.profilePic} alt="" className="w-10 h-10 rounded-full object-cover" />
            <div className="flex flex-col">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="font-medium">{ post.name}</span>
              </Link>
              <span className="text-xs">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} className="cursor-pointer" />
          {menuOpen && post.userId === currentUser.id && (
            <button onClick={handleDelete} className="absolute top-[30px] right-0 border-none bg-[#f0544f] px-[5px] py-[5px] cursor-pointer text-white">
              delete
            </button>
          )}
        </div>
        <div className="my-5">
          <p>{post.desc}</p>
          <img src={"/upload/" + post.img} alt="" className="w-full max-h-[500px] object-cover mt-5" />
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-[10px] cursor-pointer text-sm">
            {isLoading ? (
              "loading"
            ) : error ? (
              "Something went wrong"
            ) : data.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
             {error ? "Error" : data?.length} Likes
          </div>
          <div className="flex items-center gap-[10px] cursor-pointer text-sm" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            See Comments
          </div>
          <div className="flex items-center gap-[10px] cursor-pointer text-sm">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
