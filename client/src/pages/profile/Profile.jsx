import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";
import { useState } from "react";

const Profile = () => {
    const [openUpdate, setOpenUpdate] = useState(false);
    const { currentUser } = useContext(AuthContext);

    const userId = parseInt(useLocation().pathname.split("/")[2]);

    const { isLoading, data } = useQuery(["user"], () =>
        makeRequest.get("/users/find/" + userId).then((res) => {
            return res.data;
        })
    );

    const { isLoading: rIsLoading, data: relationshipData } = useQuery(
        ["relationship"],
        () =>
            makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
                return res.data;
            })
    );

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (following) => {
            if (following)
                return makeRequest.delete("/relationships?userId=" + userId);
            return makeRequest.post("/relationships", { userId });
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["relationship"]);
            },
        }
    );

    const handleFollow = () => {
        mutation.mutate(relationshipData.includes(currentUser.id));
    };

    return (
        <div className="bg-light-bgSoft dark:bg-dark-bgSoft">
            {isLoading ? (
                "loading"
            ) : data && typeof data === "object" && data.code && data.fatal ? (
                <div>Error: {data.code}</div>
            ) : (
                <>
                    <div className="w-full h-[300px] relative">
                        <img src={"/upload/" + data.coverPic} alt="" className="w-full h-full object-cover" />
                        <img
                            src={"/upload/" + data.profilePic}
                            alt=""
                            className="w-[200px] h-[200px] rounded-full object-cover absolute left-0 right-0 mx-auto top-[200px]"
                        />
                    </div>
                    <div className="py-5 px-[70px] mobile:p-[10px] tablet:p-5">
                        <div className="h-[180px] shadow-[0px_0px_25px_-10px_rgba(0,0,0,0.38)] rounded-[20px] bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text p-[50px] flex items-center justify-between mb-5 mobile:flex-col mobile:h-[30vh] mobile:p-5 mobile:mt-[100px]">
                            <div className="flex-1 flex gap-[10px] tablet:flex-wrap">
                                <a href="http://facebook.com" className="text-light-textSoft dark:text-dark-textSoft">
                                    <FacebookTwoToneIcon fontSize="large" />
                                </a>
                                <a href="http://instagram.com" className="text-light-textSoft dark:text-dark-textSoft">
                                    <InstagramIcon fontSize="large" />
                                </a>
                                <a href="http://twitter.com" className="text-light-textSoft dark:text-dark-textSoft">
                                    <TwitterIcon fontSize="large" />
                                </a>
                                <a href="http://linkedin.com" className="text-light-textSoft dark:text-dark-textSoft">
                                    <LinkedInIcon fontSize="large" />
                                </a>
                                <a href="http://github.com" className="text-light-textSoft dark:text-dark-textSoft">
                                    <GitHubIcon fontSize="large" />
                                </a>
                            </div>
                            <div className="flex-1 flex flex-col items-center gap-[10px]">
                                <span className="text-[30px] font-medium">{data.name}</span>
                                <div className="w-full flex items-center justify-around">
                                    <div className="flex items-center gap-[5px] text-light-textSoft dark:text-dark-textSoft">
                                        <PlaceIcon />
                                        <span className="text-xs">{data.city}</span>
                                    </div>
                                    <div className="flex items-center gap-[5px] text-light-textSoft dark:text-dark-textSoft">
                                        <LanguageIcon />
                                        <span className="text-xs">{data.website}</span>
                                    </div>
                                </div>
                                {rIsLoading ? (
                                    "loading"
                                ) : userId === currentUser.id ? (
                                    <button onClick={() => setOpenUpdate(true)} className="border-none bg-[#5271ff] text-white py-[10px] px-5 rounded-[5px] cursor-pointer">
                                        update
                                    </button>
                                ) : (
                                    <button onClick={handleFollow} className="border-none bg-[#5271ff] text-white py-[10px] px-5 rounded-[5px] cursor-pointer">
                                        {relationshipData.includes(currentUser.id)
                                            ? "Following"
                                            : "Follow"}
                                    </button>
                                )}
                            </div>
                            <div className="flex-1 flex items-center justify-end gap-[10px]">
                                <EmailOutlinedIcon />
                                <MoreVertIcon />
                            </div>
                        </div>
                        <Posts userId={userId} />
                    </div>
                </>
            )}
            {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
        </div>
    );
};

export default Profile;
