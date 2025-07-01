// Login.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, resetAuthError } from "../../redux/reducers/userSlice.js";
import { getAccessToken, decodeToken } from "../../utils/auth.js";
import { useUser } from "../../context/UserContext.jsx";
import Cookies from 'js-cookie';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.userSlice);
  const { loginUser } = useUser();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    dispatch(resetAuthError());
    return () => {
      dispatch(resetAuthError());
    };
  }, [dispatch]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    if (error) {
      dispatch(resetAuthError());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    try {
      const resultAction = await dispatch(login(formData)).unwrap();

      if (resultAction) {
        console.log("Cookies after login attempt:", Cookies.get());
        console.log("accessToken cookie value (direct):", Cookies.get('accessToken'));

        const accessToken = getAccessToken();

        if (accessToken && typeof accessToken === 'string') {
          const decodedToken = decodeToken(accessToken);

          if (decodedToken && decodedToken.role) {
            loginUser(accessToken); // Store user info in context

            switch (decodedToken.role) {
              case "admin":
                navigate("/admin", { replace: true });
                break;
              case "user":
                navigate("/user", { replace: true });
                break;
              default:
                navigate("/", { replace: true });
                break;
            }
          } else {
            console.warn("Decoded token or role not found after login.");
            navigate("/", { replace: true });
          }
        } else {
          console.error("Access token not found or invalid after successful login. This might indicate the backend didn't set the cookie or there's a timing issue.");
          navigate("/login", { replace: true });
        }
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-400">Sign in to your account</p>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-600 p-8 shadow-2xl backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your email"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    📧
                  </div>
                </div>
                {formErrors.email && (
                    <p className="text-red-400 text-xs mt-2 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {formErrors.email}
                    </p>
                )}
              </div>

              <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 pr-12"
                      placeholder="Enter your password"
                  />
                  <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {formErrors.password && (
                    <p className="text-red-400 text-xs mt-2 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {formErrors.password}
                    </p>
                )}
              </div>

              {error && (
                  <p className="text-red-400 text-sm text-center">
                    {error}
                  </p>
              )}

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-gray-400">
                  <input
                      type="checkbox"
                      className="mr-2 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-2"
                  />
                  Remember me
                </label>
                <a
                    href="/forgot-password"
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-300 hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Signing In...
                    </div>
                ) : (
                    "Sign In"
                )}
              </button>

              <div className="text-center pt-4 border-t border-gray-700">
                <p className="text-gray-400 text-sm">
                  Don't have an account?{" "}
                  <a
                      href="/register"
                      className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300 hover:underline"
                  >
                    Create one now
                  </a>
                </p>
              </div>
            </form>
          </div>

          <div className="text-center mt-6 text-gray-500 text-xs">
            <p className="flex items-center justify-center">
              <span className="mr-1">🔒</span>
              Your information is secure and encrypted
            </p>
          </div>
        </div>
      </div>
  );
};

export default LoginForm;