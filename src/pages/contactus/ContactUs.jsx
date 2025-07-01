import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300 flex flex-col">
      {/* Map Section */}
      <section className="relative z-0 w-full h-[400px] md:h-[500px] mt-50"> {/* mt-20 = ~80px */}
        <iframe
          title="Hotel Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6403.798314313027!2d49.84487049440863!3d40.371224114760096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307dac39cb4bf1%3A0xbabf0162238cc76f!2sHilton%20Baku!5e0!3m2!1str!2saz!4v1751373289761!5m2!1str!2saz"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          className="rounded-md"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      {/* Contact Information Section */}
      <section className="w-4/5 max-w-4xl mx-auto my-12 text-center text-gray-800 dark:text-gray-200">
        <h1 className="text-4xl font-semibold mb-6">Contact Us</h1>
        <p className="text-lg mb-2">
          <strong>Address:</strong> 1B Azadlig Ave, Baku 1000, Azerbaijan
        </p>
        <p className="text-lg mb-2">
          <strong>Phone:</strong> +994 12 555 1234
        </p>
        <p className="text-lg mb-2">
          <strong>Email:</strong> contact@hiltonbaku.com
        </p>
        <p className="text-lg">
          Feel free to reach out to us with any inquiries. We’re here to assist
          you and make your stay unforgettable.
        </p>
      </section>
    </div>
  );
};

export default ContactUs;
