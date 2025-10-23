import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
    const { toggle, darkMode } = useContext(DarkModeContext);
    const { currentUser, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="flex items-center justify-between px-5 py-[10px] h-[50px] border-b border-light-border dark:border-dark-border sticky top-0 bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text z-[999]">
            <div className="flex items-center gap-[30px]">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="font-bold text-xl text-light-logo dark:text-dark-logo">socialShare</span>
                </Link>

                <Link to="/">
                    <HomeOutlinedIcon />
                </Link>

                {darkMode ? (
                    <WbSunnyOutlinedIcon onClick={toggle} className="cursor-pointer" />
                ) : (
                    <DarkModeOutlinedIcon onClick={toggle} className="cursor-pointer" />
                )}
                <GridViewOutlinedIcon />
                <div className="flex items-center gap-[10px] border border-light-border dark:border-dark-border rounded-[5px] px-[5px] py-[5px]">
                    <SearchOutlinedIcon />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border-none w-[500px] bg-transparent text-light-text dark:text-dark-text focus:outline-none mobile:hidden tablet:w-[200px]"
                    />
                </div>
            </div>
            <div className="flex items-center gap-5 mobile:hidden">
                <Link to={`/profile/${currentUser.id}`}>
                    <PersonOutlinedIcon />
                </Link>

                <EmailOutlinedIcon />
                <NotificationsOutlinedIcon />
                <LogoutOutlinedIcon onClick={handleLogout} className="cursor-pointer" />

                <div className="flex items-center gap-[10px] font-medium tablet:hidden">
                    {typeof currentUser?.profilePic === "string" && (
                        <Link to={`/profile/${currentUser.id}`}>
                            <img src={"/upload/" + currentUser.profilePic} alt="" className="w-[30px] h-[30px] rounded-full object-cover" />
                        </Link>
                    )}
                    {typeof currentUser?.name === "string" && (
                        <span>{currentUser.name}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
