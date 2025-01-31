"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  GithubIcon,
  TwitterIcon,
  LinkedinIcon,
  HeartIcon,
  MailIcon,
  Send,
} from "lucide-react";
import { redirect } from "next/navigation";
import Image from "next/image";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const Items = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Env", link: "/env" },
];

const Footer: React.FC = () => {
  const { data: session } = useSession();
  const name = session?.user?.name || "Guest";
  const email = session?.user?.email || "";
  const currentYear = new Date().getFullYear();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!message.trim()) {
      toast.error("Please enter a message before sending.");
      return;
    }
    setLoading(true);

    const templateParams = {
      user_name: name, // User's name (from session or "Guest")
      user_email: email || "No email provided", // User's email or fallback text
      message: message, // The message content
    };

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID || "",
        templateParams,
        process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY || ""
      )
      .then(
        () => {
          toast.success("Message sent successfully!");
          setMessage(""); // Clear input field after success
          setLoading(false);
        },
        (error) => {
          console.error("Email sending error:", error);
          toast.error("Failed to send message. Please try again.");
          setLoading(false);
        }
      );
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <Image
              src={
                "https://res.cloudinary.com/dib0peewu/image/upload/v1738348919/logo_lg5hvq.webp"
              }
              alt="Storenv Logo"
              width={160}
              height={40}
              className="w-44 block dark:hidden"
            />
            <Image
              src={
                "https://res.cloudinary.com/dib0peewu/image/upload/v1738357213/0f0e31a1-47c0-4fe8-a5dd-0bf1653a0cb5_qobjip.png"
              }
              alt="Storenv Logo"
              width={160}
              height={40}
              className="w-44 hidden dark:block"
            />
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Your secure solution for managing environment variables across
              projects.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {Items.map((item, ind) => (
                <li key={ind}>
                  <span
                    onClick={() => redirect(item.link)}
                    className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all cursor-pointer text-sm"
                  >
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Get in Touch
            </h3>
            <div className="flex space-x-4">
              {[
                {
                  link: "https://github.com/gamandeepsingh/Storenv",
                  icon: GithubIcon,
                },
                { link: "https://x.com/GamandeepSingh4", icon: TwitterIcon },
                {
                  link: "https://www.linkedin.com/in/gamandeep-singh-344001256/",
                  icon: LinkedinIcon,
                },
                { link: "mailto:gamandeepsingh6@gmail.com", icon: MailIcon },
              ].map(({ link, icon: Icon }, i) => (
                <motion.a
                  key={i}
                  href={link}
                  target="_blank"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Send a Message
            </h3>
            <form
              onSubmit={sendEmail}
              className="relative flex flex-col bg-white dark:bg-gray-700 rounded-lg shadow-sm p-4 space-y-3"
            >
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message..."
                className="bg-transparent flex-1 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 focus:outline-none resize-none min-h-[100px]"
              />
              <button
                type="submit"
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-600 transition-all flex items-center gap-1 self-end"
                disabled={loading}
              >
                <Send size={16} />{" "}
                <span>{loading ? "Sending..." : "Send"}</span>
              </button>
            </form>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400"
        >
          <p>
            Made with{" "}
            <HeartIcon
              size={16}
              className="inline-block text-indigo-500 mx-1"
            />
            © {currentYear} Storenv. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
