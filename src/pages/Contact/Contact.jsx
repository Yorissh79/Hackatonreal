import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6 pt-[60px] pb-20">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Bir öncəki səhifəyə qayıdır
        className="self-start mb-6 text-blue-600 hover:text-blue-800 font-semibold"
      >
        &larr; Back
      </button>

      <h1 className="text-5xl font-extrabold mb-10 text-gray-900 tracking-wide drop-shadow-md">
        Contact Us
      </h1>

      <div className="flex flex-col md:flex-row w-full max-w-7xl bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 p-10 space-y-8"
          noValidate
        >
          {submitted && (
            <div className="p-4 bg-green-100 text-green-800 rounded-lg mb-6 shadow-md border border-green-300 transition-all duration-500">
              Thank you for your message! We'll get back to you soon.
            </div>
          )}

          <div>
            <label
              htmlFor="name"
              className="block font-semibold text-gray-800 mb-2"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-400 transition"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block font-semibold text-gray-800 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-400 transition"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block font-semibold text-gray-800 mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="6"
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-3 focus:ring-blue-400 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg shadow-lg hover:bg-blue-700 active:scale-95 transition-transform duration-150"
          >
            Send Message
          </button>
        </form>

        {/* Map */}
        <div className="w-full md:w-1/2 h-96 md:h-auto">
          <iframe
            title="Company Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.600749868756!2d-74.00601528459387!3d40.7127757793304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x123456789abcdef0!2sNew%20York%20City!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-r-2xl shadow-inner"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
