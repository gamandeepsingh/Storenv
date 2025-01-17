"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { GithubIcon, TwitterIcon, LinkedinIcon, HeartIcon, MailIcon } from 'lucide-react';
import { redirect } from 'next/navigation';

const Items = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Env", link: "/env" },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-900">Storenv</h3>
            <p className="text-gray-600">
            Your secure solution for managing environment variables across projects.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-2">
              {Items.map((item,ind) => (
                <li key={ind}>
                  <span
                    onClick={()=> redirect(item.link)}
                    className="text-gray-600 hover:text-indigo-500 transition-colors cursor-pointer"
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
            <h3 className="text-lg font-semibold text-gray-900">Connect</h3>
            <div className="flex space-x-4">
              <motion.a
                href="https://github.com/gamandeepsingh/Storenv"
                target='_blank'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-600 hover:text-indigo-500 transition-colors"
              >
                <GithubIcon size={20} />
              </motion.a>
              <motion.a
                href="https://x.com/GamandeepSingh4"
                target='_blank'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-600 hover:text-indigo-500 transition-colors"
              >
                <TwitterIcon size={20} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/gamandeep-singh-344001256/"
                target='_blank'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-600 hover:text-indigo-500 transition-colors"
              >
                <LinkedinIcon size={20} />
              </motion.a>
              <motion.a
                href="mailto:gamandeepsingh6@gmail.com"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-600 hover:text-indigo-500 transition-colors"
              >
                <MailIcon size={20} />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 pt-8 border-t border-gray-200"
        >
          <p className="text-center text-gray-600 flex items-center justify-center">
            Made with <HeartIcon size={16} className="mx-1 text-red-500" /> © {currentYear}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;