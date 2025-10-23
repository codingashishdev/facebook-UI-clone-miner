import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

const LeftBar = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="flex-2 sticky top-[70px] h-[calc(100vh-70px)] overflow-scroll bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text mobile:hidden [&::-webkit-scrollbar]:hidden">
            <div className="p-5">
                <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-[10px]">
                        <img
                            src={"/upload/" + currentUser.profilePic}
                            alt=""
                            className="w-[30px] h-[30px] rounded-full object-cover"
                        />
                        <span className="text-sm">{currentUser.name}</span>
                    </div>
                    <div className="flex items-center gap-[10px]">
                        <img src={Friends} alt="" className="w-[30px]" />
                        <span className="text-sm">Friends</span>
                    </div>
                    <div className="flex items-center gap-[10px]">
                        <img src={Groups} alt="" className="w-[30px]" />
                        <span className="text-sm">Groups</span>
                    </div>
                    <div className="flex items-center gap-[10px]">
                        <img src={Market} alt="" className="w-[30px]" />
                        <span className="text-sm">Marketplace</span>
                    </div>
                    <div className="flex items-center gap-[10px]">
                        <img src={Watch} alt="" className="w-[30px]" />
                        <span className="text-sm">Watch</span>
                    </div>
                    <div className="flex items-center gap-[10px]">
                        <img src={Memories} alt="" className="w-[30px]" />
                        <span className="text-sm">Memories</span>
                    </div>
                </div>
                <hr className="my-5 border-none h-[0.5px] bg-light-border dark:bg-dark-border" />
                <div className="flex flex-col gap-5">
                    <span className="text-xs">Your shortcuts</span>
                    <div className="flex items-center gap-[10px]">
                        <img src={Events} alt="" className="w-[30px]" />
                        <span className="text-sm">Events</span>
                    </div>
                    <div className="flex items-center gap-[10px]">
                        <img src={Gaming} alt="" className="w-[30px]" />
                        <span className="text-sm">Gaming</span>
                    </div>
                    <div className="flex items-center gap-[10px]">
                        <img src={Gallery} alt="" className="w-[30px]" />
                        <span className="text-sm">Gallery</span>
                    </div>
                    <div className="flex items-center gap-[10px]">
                        <img src={Videos} alt="" className="w-[30px]" />
                        <span className="text-sm">Videos</span>
                    </div>
                    <div className="flex items-center gap-[10px]">
                        <img src={Messages} alt="" className="w-[30px]" />
                        <span className="text-sm">Messages</span>
                    </div>
                </div>
                <hr className="my-5 border-none h-[0.5px] bg-light-border dark:bg-dark-border" />
                <div className="flex flex-col gap-5">
                    <span className="text-xs">Others</span>
                    <div className="flex items-center gap-[10px]">
                        <img src={Fund} alt="" className="w-[30px]" />
                        <span className="text-sm">Fundraiser</span>
                    </div>
                    <div className="flex items-center gap-[10px]">
                        <img src={Tutorials} alt="" className="w-[30px]" />
                        <span className="text-sm">Tutorials</span>
                    </div>
                    <div className="flex items-center gap-[10px]">
                        <img src={Courses} alt="" className="w-[30px]" />
                        <span className="text-sm">Courses</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftBar;
