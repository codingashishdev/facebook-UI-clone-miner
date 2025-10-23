import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        name: "",
    });
    const [err, setErr] = useState(null);

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8800/api/auth/register", inputs);
        } catch (err) {
            setErr(err.response.data);
        }
    };

    console.log(err);

    return (
        <div className="h-screen bg-[rgb(193,190,255)] flex items-center justify-center">
            <div className="w-1/2 flex flex-row-reverse bg-white rounded-[10px] min-h-[600px] overflow-hidden">
                <div className="flex-1 bg-[linear-gradient(rgba(39,11,96,0.5),rgba(39,11,96,0.5)),url('https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-center bg-cover p-[50px] flex flex-col gap-[30px] text-white">
                    <h1 className="text-[100px] leading-[100px]">Social Share</h1>
                    <p>let's connect with each others.</p>
                    <span className="text-sm">Do you have an account?</span>
                    <Link to="/login">
                        <button className="w-1/2 p-[10px] border-none bg-white text-primaryDark font-bold cursor-pointer">
                            Login
                        </button>
                    </Link>
                </div>
                <div className="flex-1 p-[50px] flex flex-col gap-[50px] justify-center">
                    <h1 className="text-[#555]">Register</h1>
                    <form className="flex flex-col gap-[30px]">
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            onChange={handleChange}
                            className="border-none border-b border-gray-300 p-[20px_10px]"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            className="border-none border-b border-gray-300 p-[20px_10px]"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            className="border-none border-b border-gray-300 p-[20px_10px]"
                        />
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            onChange={handleChange}
                            className="border-none border-b border-gray-300 p-[20px_10px]"
                        />
                        {err && <div>{JSON.stringify(err)}</div>}
                        <button
                            onClick={handleClick}
                            className="w-1/2 p-[10px] border-none bg-primary text-white font-bold cursor-pointer"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
