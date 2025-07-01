// Register.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux/reducers/userSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  // Access the entire error object from the userSlice state
  const { loading, error } = useSelector((state) => state.userSlice);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S/.test(formData.email)) {
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
    // Also clear general API error if the user starts typing after an API error
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
      const apiError = resultAction.payload; // Access the payload of the rejected action
      if (apiError && apiError.errors && apiError.errors.Error && apiError.errors.Error.length > 0) { //
        // Assuming the first error message is the most relevant for general display
        const generalErrorMessage = apiError.errors.Error[0]; //

        // Map specific API errors to form fields
        if (generalErrorMessage.includes("phone number")) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            phoneNumber: generalErrorMessage, // Display next to phone number field
          }));
        } else {
          // For other API errors, display them generally
          setErrors((prevErrors) => ({
            ...prevErrors,
            api: generalErrorMessage, // Display as a general API error
          }));
        }
      } else {
        // Fallback for unexpected error structures or network errors
        setErrors((prevErrors) => ({
          ...prevErrors,
          api: error?.message || 'Registration failed due to an unknown error.', // Use the Redux 'error' if available, or a generic message
        }));
      }
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Join Us</h1>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-400">Create your account to get started</p>
          </div>

          {/* Form Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-600 p-8 shadow-2xl backdrop-blur-sm">
            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Full Name
                </label>
                <div className="relative">
                  <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your full name"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-purple-600/0 opacity-0 transition-opacity duration-300 pointer-events-none focus-within:opacity-20"></div>
                </div>
                {errors.fullName && (
                    <p className="text-red-400 text-xs mt-2 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.fullName}
                    </p>
                )}
              </div>

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
                </div>
                {errors.email && (
                    <p className="text-red-400 text-xs mt-2 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.email}
                    </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your phone number"
                  />
                </div>
                {errors.phoneNumber && (
                    <p className="text-red-400 text-xs mt-2 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.phoneNumber}
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
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Create a password"
                  />
                </div>
                {errors.password && (
                    <p className="text-red-400 text-xs mt-2 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.password}
                    </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Confirm your password"
                  />
                </div>
                {errors.confirmPassword && (
                    <p className="text-red-400 text-xs mt-2 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.confirmPassword}
                    </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Creating Account...
                    </div>
                ) : (
                    "Create Account"
                )}
              </button>

              {/* Display general API error */}
              {errors.api && (
                  <p className="text-red-400 text-sm text-center mt-4 flex items-center justify-center">
                    <span className="mr-1">❗</span>
                    {errors.api}
                  </p>
              )}

              {/* Login Link */}
              <div className="text-center pt-4 border-t border-gray-700">
                <p className="text-gray-400 text-sm">
                  Already have an account?{" "}
                  <a
                      href="/register/login"
                      className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300 hover:underline"
                  >
                    Sign in here
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-gray-500 text-xs">
            <p>
              By creating an account, you agree to our Terms of Service and
              Privacy Policy
            </p>
          </div>
        </div>
      </div>
  );
};

export default RegisterForm;