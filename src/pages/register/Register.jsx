import React, { useState } from "react";

const RegisterForm = () => {
  // Mock Redux functions for demo
  const loading = false;
  const error = null;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^[0-9]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Only numbers are allowed";
    } else if (formData.phoneNumber.length < 10) {
      newErrors.phoneNumber = "Phone number is too short";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords must match";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    if (errors.api) {
      setErrors((prev) => ({
        ...prev,
        api: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear previous API errors
    setErrors({});

    // Dispatch the signup thunk
    const resultAction = await dispatch(signup({
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    }));

    // Check if signup was successful
    if (signup.fulfilled.match(resultAction)) {
      navigate('/register/login');
    } else if (signup.rejected.match(resultAction)) {
      // Handle API errors
      const apiError = resultAction.payload;
      if (apiError && apiError.errors && apiError.errors.Error && apiError.errors.Error.length > 0) {
        const generalErrorMessage = apiError.errors.Error[0];

        if (generalErrorMessage.includes("phone number")) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            phoneNumber: generalErrorMessage,
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            api: generalErrorMessage,
          }));
        }
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          api: error?.message || 'Registration failed due to an unknown error.',
        }));
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center py-12"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white/30 backdrop-blur-md shadow-lg rounded-xl px-10 py-8 max-w-md w-full mx-4 border border-white/40"
        noValidate
      >
        <h2 className="text-3xl font-bold text-white text-center mb-2 drop-shadow-md">
          Join Paradise 🏝️
        </h2>
        <p className="text-white/80 text-center mb-6 text-sm drop-shadow-sm">
          Create your account for the ultimate beach experience
        </p>

        {/* Full Name */}
        <label htmlFor="fullName" className="block text-white font-medium mb-1">
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          id="fullName"
          placeholder="Your full name"
          value={formData.fullName}
          onChange={handleChange}
          className={`w-full px-4 py-2 mb-2 rounded-md focus:outline-none bg-white/60 text-gray-900 placeholder-gray-500 ${
            errors.fullName ? "border border-red-500" : "border border-transparent"
          }`}
          autoComplete="name"
        />
        {errors.fullName && (
          <p className="text-sm text-red-200 mb-2">{errors.fullName}</p>
        )}

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
            errors.email ? "border border-red-500" : "border border-transparent"
          }`}
          autoComplete="email"
        />
        {errors.email && (
          <p className="text-sm text-red-200 mb-2">{errors.email}</p>
        )}

        {/* Phone Number */}
        <label htmlFor="phoneNumber" className="block text-white font-medium mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          name="phoneNumber"
          id="phoneNumber"
          placeholder="Your phone number"
          value={formData.phoneNumber}
          onChange={handleChange}
          className={`w-full px-4 py-2 mb-2 rounded-md focus:outline-none bg-white/60 text-gray-900 placeholder-gray-500 ${
            errors.phoneNumber ? "border border-red-500" : "border border-transparent"
          }`}
          autoComplete="tel"
        />
        {errors.phoneNumber && (
          <p className="text-sm text-red-200 mb-2">{errors.phoneNumber}</p>
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
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-md bg-white/60 text-gray-900 placeholder-gray-500 ${
              errors.password
                ? "border border-red-500"
                : "border border-transparent"
            }`}
            autoComplete="new-password"
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
        {errors.password && (
          <p className="text-sm text-red-200 mb-2">{errors.password}</p>
        )}

        {/* Confirm Password */}
        <label htmlFor="confirmPassword" className="block text-white font-medium mb-1">
          Confirm Password
        </label>
        <div className="relative mb-2">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-md bg-white/60 text-gray-900 placeholder-gray-500 ${
              errors.confirmPassword
                ? "border border-red-500"
                : "border border-transparent"
            }`}
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-2 text-white"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? "🙈" : "👁️"}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-200 mb-4">{errors.confirmPassword}</p>
        )}

        {/* API Error */}
        {errors.api && (
          <p className="text-center text-red-100 font-medium mb-4">{errors.api}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-300 text-gray-900 py-2 rounded-md font-semibold transition-colors mb-4"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-2"></div>
              Creating Account...
            </div>
          ) : (
            "Create Account"
          )}
        </button>

        {/* Login Link */}
        <div className="text-center text-white/90 text-sm mb-4">
          Already have an account?{" "}
          <a
            href="/register/login"
            className="text-yellow-300 hover:text-yellow-200 font-medium underline transition-colors"
          >
            Sign in here
          </a>
        </div>

        <p className="text-center text-white/70 text-xs drop-shadow-sm">
          🌊 Ready to dive into paradise? 🏖️
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;