// Login.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, resetAuthError } from "../../redux/reducers/userSlice.js";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.userSlice);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Clear Redux error when component mounts
  useEffect(() => {
    dispatch(resetAuthError());
  }, [dispatch]);

  // Enhanced navigation logic based on user role
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log("User authenticated:", user);

      // Navigate based on user role
      switch (user.role) {
        case "Admin":
          console.log("Admin user detected, navigating to /admin");
          navigate("/admin", { replace: true });
          break;
        case "User":
          console.log("Regular user detected, navigating to /user");
          navigate("/user", { replace: true });
          break;
        default:
          console.log("Unknown role:", user.role, "redirecting to home");
          navigate("/", { replace: true });
          break;
      }
    }
  }, [isAuthenticated, user, navigate]);

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

    // Clear form-specific error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    // Also clear Redux error on input change
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
      // Dispatch the login async thunk
      const result = await dispatch(login(formData)).unwrap();
      console.log("Login successful:", result);

      // Navigation will be handled by the useEffect above
      // when isAuthenticated and user state are updated
    } catch (error) {
      console.error("Login failed:", error);
      // Error will be handled by Redux state
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-400">Sign in to your account</p>
          </div>

          {/* Form Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-600 p-8 shadow-2xl backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
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

              {/* Password */}
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

              {/* Redux Error Display */}
              {error && (
                  <p className="text-red-400 text-sm text-center">
                    {error}
                  </p>
              )}

              {/* Remember Me & Forgot Password */}
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

              {/* Submit Button */}
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

              {/* Register Link */}
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

          {/* Security Notice */}
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