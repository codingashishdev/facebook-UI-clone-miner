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

    const { isLoading, data, error } = useQuery({
        queryKey: ["user", userId],
        queryFn: () =>
            makeRequest.get("/users/find/" + userId).then((res) => {
                return res.data;
            }),
    });

    const { isLoading: rIsLoading, data: relationshipData } = useQuery({
        queryKey: ["relationship", userId],
        queryFn: () =>
            makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
                return res.data;
            }),
    });

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (following) => {
            if (following)
                return makeRequest.delete("/relationships?userId=" + userId);
            return makeRequest.post("/relationships", { userId });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["relationship", userId]);
            },
        }
    );

    const handleFollow = () => {
        if (!currentUser) return;
        const isFollowing = Array.isArray(relationshipData) && relationshipData.includes(currentUser.id);
        mutation.mutate(isFollowing);
    };

    return (
        <div className="bg-light-bgSoft dark:bg-dark-bgSoft min-h-screen">
            {isLoading ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="text-center">
                        <svg className="animate-spin h-12 w-12 text-purple-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
                    </div>
                </div>
            ) : error || (data && typeof data === "object" && data.code && data.fatal) ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8 max-w-md text-center">
                        <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">Error Loading Profile</h3>
                        <p className="text-red-600 dark:text-red-300">{error?.message || data?.code || "Failed to load user profile"}</p>
                    </div>
                </div>
            ) : (
                <>
                    {/* Cover and Profile Picture Section */}
                    <div className="w-full h-[300px] relative">
                        <img 
                            src={"/upload/" + data.coverPic} 
                            alt="Cover" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.src = "https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600";
                            }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <img
                            src={"/upload/" + data.profilePic}
                            alt="Profile"
                            className="w-[180px] h-[180px] rounded-full object-cover absolute left-0 right-0 mx-auto top-[200px] border-4 border-white dark:border-dark-bg shadow-xl"
                            onError={(e) => {
                                e.target.src = "https://via.placeholder.com/180";
                            }}
                        />
                    </div>

                    {/* Profile Info Section */}
                    <div className="py-5 px-4 md:px-[70px] mobile:p-[10px] tablet:p-5">
                        <div className="min-h-[180px] shadow-[0px_0px_25px_-10px_rgba(0,0,0,0.38)] rounded-[20px] bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text p-6 md:p-[50px] flex flex-col md:flex-row items-center justify-between mb-5 mobile:mt-[100px] gap-4">
                            {/* Social Links */}
                            <div className="flex-1 flex gap-[10px] flex-wrap justify-center md:justify-start">
                                <a href="http://facebook.com" className="text-light-textSoft dark:text-dark-textSoft hover:text-purple-600 dark:hover:text-purple-400 transition-colors" aria-label="Facebook">
                                    <FacebookTwoToneIcon fontSize="large" />
                                </a>
                                <a href="http://instagram.com" className="text-light-textSoft dark:text-dark-textSoft hover:text-purple-600 dark:hover:text-purple-400 transition-colors" aria-label="Instagram">
                                    <InstagramIcon fontSize="large" />
                                </a>
                                <a href="http://twitter.com" className="text-light-textSoft dark:text-dark-textSoft hover:text-purple-600 dark:hover:text-purple-400 transition-colors" aria-label="Twitter">
                                    <TwitterIcon fontSize="large" />
                                </a>
                                <a href="http://linkedin.com" className="text-light-textSoft dark:text-dark-textSoft hover:text-purple-600 dark:hover:text-purple-400 transition-colors" aria-label="LinkedIn">
                                    <LinkedInIcon fontSize="large" />
                                </a>
                                <a href="http://github.com" className="text-light-textSoft dark:text-dark-textSoft hover:text-purple-600 dark:hover:text-purple-400 transition-colors" aria-label="GitHub">
                                    <GitHubIcon fontSize="large" />
                                </a>
                            </div>

                            {/* User Info */}
                            <div className="flex-1 flex flex-col items-center gap-[10px]">
                                <span className="text-2xl md:text-[30px] font-bold">{data.name}</span>
                                <div className="w-full flex items-center justify-center gap-4 md:gap-8 flex-wrap">
                                    <div className="flex items-center gap-[5px] text-light-textSoft dark:text-dark-textSoft">
                                        <PlaceIcon fontSize="small" />
                                        <span className="text-xs md:text-sm">{data.city || "Not specified"}</span>
                                    </div>
                                    <div className="flex items-center gap-[5px] text-light-textSoft dark:text-dark-textSoft">
                                        <LanguageIcon fontSize="small" />
                                        <span className="text-xs md:text-sm">{data.website || "No website"}</span>
                                    </div>
                                </div>
                                {rIsLoading ? (
                                    <div className="w-24 h-10 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg"></div>
                                ) : userId === currentUser.id ? (
                                    <button 
                                        onClick={() => setOpenUpdate(true)} 
                                        className="border-none bg-purple-600 text-white py-[10px] px-6 rounded-lg cursor-pointer hover:bg-purple-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                    >
                                        Edit Profile
                                    </button>
                                ) : (
                                    <button 
                                        onClick={handleFollow} 
                                        disabled={mutation.isLoading}
                                        className={`border-none ${
                                            relationshipData.includes(currentUser.id) 
                                                ? "bg-gray-500 hover:bg-gray-600" 
                                                : "bg-purple-600 hover:bg-purple-700"
                                        } text-white py-[10px] px-6 rounded-lg cursor-pointer transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        {mutation.isLoading ? (
                                            <span className="flex items-center gap-2">
                                                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Loading...
                                            </span>
                                        ) : relationshipData.includes(currentUser.id) ? (
                                            "Following"
                                        ) : (
                                            "Follow"
                                        )}
                                    </button>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex-1 flex items-center justify-center md:justify-end gap-4">
                                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" aria-label="Email">
                                    <EmailOutlinedIcon />
                                </button>
                                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" aria-label="More options">
                                    <MoreVertIcon />
                                </button>
                            </div>
                        </div>

                        {/* Posts Section */}
                        <Posts userId={userId} />
                    </div>
                </>
            )}
            {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
        </div>
    );
};

export default Profile;
