import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Register = () => {
    const [inputs, setInputs] = useState({ username: "", email: "", password: "", name: "" });
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (err) setErr(null);
        setValidationErrors({});
    }, [inputs]);

    const handleChange = (e) => setInputs((p) => ({ ...p, [e.target.name]: e.target.value }));

    const validate = () => {
        const errors = {};
        if (!inputs.username.trim()) errors.username = "Username is required";
        if (!inputs.email.trim()) errors.email = "Email is required";
        if (!inputs.password) errors.password = "Password is required";
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const submit = async (e) => {
        e.preventDefault();
        setErr(null);
        if (!validate()) return;
        setLoading(true);
        try {
            await axios.post("http://localhost:8800/api/auth/register", inputs);
            navigate("/login");
        } catch (error) {
            setErr(error.response?.data?.message || "Failed to register");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-300 to-purple-200 flex items-center justify-center p-6">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 bg-purple-800 text-white flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">SocialShare</h1>
                        <p className="mt-2 text-sm opacity-90">Join our community and start sharing your moments with friends around the world.</p>
                    </div>
                    <div>
                        <p>Already have an account?</p>
                        <Link to="/login">
                            <button className="mt-4 px-4 py-2 border border-white rounded-lg bg-transparent hover:bg-white hover:text-purple-800 transition">Login</button>
                        </Link>
                    </div>
                </div>

                <div className="p-8">
                    <h2 className="text-2xl font-bold mb-4">Create an account</h2>
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                id="username"
                                name="username"
                                value={inputs.username}
                                onChange={handleChange}
                                className="mt-1 block w-full border rounded-md p-2"
                                disabled={loading}
                                aria-invalid={validationErrors.username ? "true" : "false"}
                            />
                            {validationErrors.username && <p className="text-red-500 text-xs">{validationErrors.username}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={inputs.email}
                                onChange={handleChange}
                                className="mt-1 block w-full border rounded-md p-2"
                                disabled={loading}
                                aria-invalid={validationErrors.email ? "true" : "false"}
                            />
                            {validationErrors.email && <p className="text-red-500 text-xs">{validationErrors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={inputs.password}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border rounded-md p-2 pr-10"
                                    disabled={loading}
                                    aria-invalid={validationErrors.password ? "true" : "false"}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((s) => !s)}
                                    className="absolute right-2 top-2 text-gray-600"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </button>
                            </div>
                            {validationErrors.password && <p className="text-red-500 text-xs mt-1">{validationErrors.password}</p>}
                        </div>

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full name</label>
                            <input
                                id="name"
                                name="name"
                                value={inputs.name}
                                onChange={handleChange}
                                className="mt-1 block w-full border rounded-md p-2"
                                disabled={loading}
                                aria-invalid={validationErrors.name ? "true" : "false"}
                            />
                            {validationErrors.name && <p className="text-red-500 text-xs">{validationErrors.name}</p>}
                        </div>

                        {err && <div className="text-red-600">{err}</div>}

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-2 rounded-md bg-purple-600 text-white font-semibold hover:bg-purple-700 disabled:opacity-60"
                            >
                                {loading ? "Creating..." : "Register"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
