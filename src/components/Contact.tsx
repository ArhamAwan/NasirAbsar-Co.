import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Linkedin,
  CheckCircle,
  ExternalLink,
} from "lucide-react";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Office Address",
      details: ["I-8 Markaz", "Islamabad, Pakistan", "Postal Code: 44000"],
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: ["051-4861322"],
    },
    {
      icon: Mail,
      title: "Email Addresses",
      details: [
        "info@nasirabsar.com",
        "nasir@nasirabsar.com",
        "support@nasirabsar.com",
      ],
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9:00 AM - 6:00 PM",
        "Saturday: 9:00 AM - 2:00 PM",
        "Sunday: Closed",
      ],
    },
  ];

  const services = [
    "Accounting Services",
    "Auditing",
    "Tax Services",
    "Financial Advisory",
    "Corporate Services",
    "Business Consulting",
  ];

  return (
    <section
      id="contact"
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-white via-blue-50/20 to-gray-50 overflow-x-hidden w-full max-w-full"
    >
      <div className="container mx-auto px-4 sm:px-6 w-full max-w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 px-2">
            Get In Touch
          </h2>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Ready to take your business to the next level? Contact us today for
            a free consultation and discover how our expertise can benefit your
            organization.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <h3 className="text-xl xs:text-2xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6">
              Contact Information
            </h3>

            <div className="space-y-4 sm:space-y-5">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="glass-card flex items-start space-x-3 sm:space-x-4 p-4 sm:p-5 rounded-lg sm:rounded-xl border border-white/50"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                    <info.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm xs:text-base font-semibold text-gray-900 mb-1 sm:mb-1.5 break-words">
                      {info.title}
                    </h4>
                    {info.details.map((detail, detailIndex) => (
                      <p
                        key={detailIndex}
                        className="text-xs xs:text-sm text-gray-600 break-words"
                      >
                        {detail}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h4 className="text-base font-semibold text-gray-900 mb-3">
                Follow Us
              </h4>
              <div className="flex space-x-3">
                <motion.a
                  href="https://pk.linkedin.com/company/nasir-absar-co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 glass-button rounded-lg flex items-center justify-center text-white transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin size={18} />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-white/50 shadow-xl h-fit"
          >
            <h3 className="text-xl xs:text-2xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6">
              Get Consultation
            </h3>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-3" />
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Message Sent!
                </h4>
                <p className="text-gray-600 text-sm">
                  Thank you for contacting us. We'll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-medium text-gray-700 mb-1.5"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 glass-light border border-white/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-300 backdrop-blur-sm text-sm"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-medium text-gray-700 mb-1.5"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 glass-light border border-white/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-300 backdrop-blur-sm text-sm"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-medium text-gray-700 mb-1.5"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 glass-light border border-white/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-300 backdrop-blur-sm text-sm"
                      placeholder="+92-300-1234567"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="service"
                      className="block text-xs font-medium text-gray-700 mb-1.5"
                    >
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 glass-light border border-white/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-300 backdrop-blur-sm text-sm"
                    >
                      <option value="">Select a service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-medium text-gray-700 mb-1.5"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 glass-light border border-white/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-300 resize-none backdrop-blur-sm text-sm"
                    placeholder="Tell us about your requirements..."
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full glass-button text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-300 text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={16} />
                  <span>Send Message</span>
                </motion.button>
              </form>
            )}

            {/* Interactive Google Map - Below Contact Form */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="glass-card rounded-2xl overflow-hidden shadow-xl border border-white/50">
                <div className="p-3 glass-button text-white flex items-center justify-between backdrop-blur-md">
                  <h4 className="font-semibold text-sm">Our Location</h4>
                  <motion.a
                    href="https://www.google.com/maps/place/Nasir+Absar+%26+Co./@33.6667328,73.0744607,17z/data=!3m1!4b1!4m6!3m5!1s0x38df9545c039c771:0xe95b80ede34e9298!8m2!3d33.6667328!4d73.0744607!16s%2Fg%2F11h0znj63?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-100 hover:text-white transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-xs">View on Google Maps</span>
                    <ExternalLink size={14} />
                  </motion.a>
                </div>
                <div className="h-64">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.8234567890123!2d73.0744607!3d33.6667328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df9545c039c771%3A0xe95b80ede34e9298!2sNasir%20Absar%20%26%20Co.!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Nasir Absar & Co. Location"
                  />
                </div>
                <div className="p-3 glass-light">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <MapPin size={14} className="text-blue-600" />
                    <span className="text-xs font-medium">
                      I-8 Markaz, Islamabad, Pakistan
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
