import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, resetAuthError } from "../../redux/reducers/userSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.userSlice);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    dispatch(resetAuthError());
  }, [dispatch]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }));
    if (error) dispatch(resetAuthError());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const result = await dispatch(login(formData)).unwrap();
      if (result.role) {
        const role = result.role.toLowerCase();
        navigate(`/${role}`, { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white/30 backdrop-blur-md shadow-lg rounded-xl px-10 py-8 max-w-md w-full border border-white/40"
        noValidate
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6 drop-shadow-md">
          Welcome Back ☀️
        </h2>

        {/* Email */}
        <label htmlFor="email" className="block text-white font-medium mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 mb-2 rounded-md focus:outline-none bg-white/60 text-gray-900 placeholder-gray-500 ${
            formErrors.email ? "border border-red-500" : "border border-transparent"
          }`}
          autoComplete="email"
        />
        {formErrors.email && (
          <p className="text-sm text-red-200 mb-2">{formErrors.email}</p>
        )}

        {/* Password */}
        <label htmlFor="password" className="block text-white font-medium mb-1">
          Password
        </label>
        <div className="relative mb-2">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-md bg-white/60 text-gray-900 placeholder-gray-500 ${
              formErrors.password
                ? "border border-red-500"
                : "border border-transparent"
            }`}
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-2 text-white"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        {formErrors.password && (
          <p className="text-sm text-red-200 mb-4">{formErrors.password}</p>
        )}

        {/* Server error */}
        {error && (
          <p className="text-center text-red-100 font-medium mb-4">{error}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-300 text-gray-900 py-2 rounded-md font-semibold transition-colors"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-white mt-6 italic text-sm drop-shadow-sm">
          🏖️ Enjoy your beach holiday!
        </p>
        <div className="text-center text-white/90 text-sm mb-4">
          You don`t have a account?{" "}
          <a
            href="/register/signup"
            className="text-yellow-300 hover:text-yellow-200 font-medium underline transition-colors"
          >
            Sign up here
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
