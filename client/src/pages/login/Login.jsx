import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    // Clear error when user starts typing
    useEffect(() => {
        if (err || validationErrors) {
            setErr(null);
            setValidationErrors({});
        }
    }, [inputs]);

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const validateForm = () => {
        const errors = {};
        
        if (!inputs.username.trim()) {
            errors.username = "Username is required";
        } else if (inputs.username.length < 3) {
            errors.username = "Username must be at least 3 characters";
        }

        if (!inputs.password) {
            errors.password = "Password is required";
        } else if (inputs.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        
        // Clear previous errors
        setErr(null);
        
        // Validate form
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            await login(inputs);
            navigate("/");
        } catch (err) {
            // Better error handling
            if (err.response) {
                if (err.response.status === 401) {
                    setErr("Invalid username or password");
                } else if (err.response.status === 500) {
                    setErr("Server error. Please try again later.");
                } else {
                    setErr(err.response.data?.message || "An error occurred");
                }
            } else if (err.request) {
                setErr("Network error. Please check your connection.");
            } else {
                setErr("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen bg-gradient-to-br from-purple-400 via-purple-300 to-purple-200 flex items-center justify-center p-4">
            <div className="w-full max-w-[900px] flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[500px]">
                {/* Left Side - Branding */}
                <div className="flex-1 relative p-8 md:p-12 flex flex-col gap-6 text-white overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 opacity-90 z-0"></div>
                    <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-center bg-cover opacity-30 z-0"></div>
                    
                    <div className="relative z-10 flex-1 flex flex-col">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">SocialShare</h1>
                            <p className="text-base md:text-lg leading-relaxed opacity-90">
                                Welcome to SocialShare. Share your thoughts with the world
                                and connect with each other.
                            </p>
                        </div>
                        
                        <div className="mt-auto">
                            <p className="text-base mb-3">Don't have an account?</p>
                            <Link to="/register" className="inline-block">
                                <button className="px-6 py-3 rounded-lg border-2 border-white bg-transparent text-white font-bold cursor-pointer hover:bg-white hover:text-purple-900 transition-all duration-300 ease-in-out transform hover:scale-105">
                                    Create Account
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                        <p className="text-gray-600">Please login to your account</p>
                    </div>

                    <form className="flex flex-col gap-6" onSubmit={handleLogin}>
                        {/* Username Field */}
                        <div className="relative">
                            <label 
                                htmlFor="username" 
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                placeholder="Enter your username"
                                name="username"
                                value={inputs.username}
                                onChange={handleChange}
                                autoComplete="username"
                                autoFocus
                                disabled={loading}
                                aria-invalid={validationErrors.username ? "true" : "false"}
                                aria-describedby={validationErrors.username ? "username-error" : undefined}
                                className={`w-full border-2 ${
                                    validationErrors.username ? 'border-red-400' : 'border-gray-300'
                                } rounded-lg py-3 px-4 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed`}
                            />
                            {validationErrors.username && (
                                <p id="username-error" className="text-red-500 text-xs mt-1">
                                    {validationErrors.username}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="relative">
                            <label 
                                htmlFor="password" 
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    name="password"
                                    value={inputs.password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                    disabled={loading}
                                    aria-invalid={validationErrors.password ? "true" : "false"}
                                    aria-describedby={validationErrors.password ? "password-error" : undefined}
                                    className={`w-full border-2 ${
                                        validationErrors.password ? 'border-red-400' : 'border-gray-300'
                                    } rounded-lg py-3 px-4 pr-12 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={loading}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none disabled:cursor-not-allowed"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </button>
                            </div>
                            {validationErrors.password && (
                                <p id="password-error" className="text-red-500 text-xs mt-1">
                                    {validationErrors.password}
                                </p>
                            )}
                        </div>

                        {/* Server Error Message */}
                        {err && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2" role="alert">
                                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <span>{err}</span>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-6 rounded-lg border-none bg-purple-600 text-white font-bold cursor-pointer hover:bg-purple-700 transition-all duration-300 disabled:bg-purple-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Logging in...</span>
                                </>
                            ) : (
                                <span>Login</span>
                            )}
                        </button>

                        {/* Additional Options */}
                        <div className="text-center">
                            <a href="#" className="text-sm text-purple-600 hover:text-purple-800 hover:underline">
                                Forgot password?
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
