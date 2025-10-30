import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

const Comments = ({ postId }) => {
    const [desc, setDesc] = useState("");
    const { currentUser } = useContext(AuthContext);

    const { isLoading, error, data } = useQuery({
        queryKey: ["comments"],
        queryFn: () =>
            makeRequest.get("/comments?postId=" + postId).then((res) => {
                return res.data;
            }),
    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newComment) => {
            return makeRequest.post("/comments", newComment);
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["comments"]);
        },
    });

    const handleClick = async (e) => {
        e.preventDefault();
        mutation.mutate({ desc, postId });
        setDesc("");
    };

    return (
        <div>
            <div className="flex items-center justify-between gap-5 my-5">
                <img src={"/upload/" + currentUser.profilePic} alt="" className="w-10 h-10 rounded-full object-cover" />
                <input
                    type="text"
                    placeholder="write a comment"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="flex-[5] p-[10px] border border-light-border dark:border-dark-border bg-transparent text-light-text dark:text-dark-text"
                />
                <button onClick={handleClick} className="border-none bg-[#5271ff] text-white p-[10px] cursor-pointer rounded-[3px]">
                    Send
                </button>
            </div>
            {error
                ? "Something went wrong"
                : isLoading
                    ? "loading"
                    : Array.isArray(data)
                        ? data.map((comment) => (
                            <div className="my-[30px] flex justify-between gap-5" key={comment.id}>
                                <img src={"/upload/" + comment.profilePic} alt="" className="w-10 h-10 rounded-full object-cover" />
                                <div className="flex-[5] flex flex-col gap-[3px] items-start">
                                    <span className="font-medium">{comment.name}</span>
                                    <p className="text-light-textSoft dark:text-dark-textSoft">{comment.desc}</p>
                                </div>
                                <span className="flex-1 self-center text-gray-500 text-xs">
                                    {moment(comment.createdAt).fromNow()}
                                </span>
                            </div>
                        ))
                        : "Unexpected error: data is not an array"}
        </div>
    );
};

export default Comments;
