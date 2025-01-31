"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Key, RefreshCw, Database, Cloud } from "lucide-react";
// import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: "Storenv | About",
//   description: "Learn more about Storenv and how it can help you manage your environment variables securely.",
// };

const features = [
  {
    icon: <Shield className="text-indigo-500" size={24} />,
    title: "Secure Storage",
    description:
      "Your environment variables are encrypted using industry-standard algorithms before storage.",
  },
  {
    icon: <Lock className="text-indigo-500" size={24} />,
    title: "Access Control",
    description:
      "Fine-grained permissions ensure only authorized team members can access specific environment variables.",
  },
  {
    icon: <Key className="text-indigo-500" size={24} />,
    title: "Key Management",
    description:
      "Robust key rotation and management system to maintain the highest security standards.",
  },
  {
    icon: <RefreshCw className="text-indigo-500" size={24} />,
    title: "Version Control",
    description:
      "Track changes and maintain a history of your environment configurations.",
  },
  {
    icon: <Database className="text-indigo-500" size={24} />,
    title: "Multiple Environments",
    description:
      "Easily manage different configurations for development, staging, and production environments.",
  },
  {
    icon: <Cloud className="text-indigo-500" size={24} />,
    title: "Cloud Integration",
    description:
      "Seamlessly integrate with popular cloud platforms and CI/CD pipelines.",
  },
];

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-7xl font-bold text-gray-900 dark:text-gray-500 mb-4 mt-20">
            Welcome to <span className="text-indigo-500 dark:text-indigo-400">
              Storenv
            </span>
          </h1>
          <p className="text-base md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Your secure solution for managing environment variables across
            projects. We make it easy to store, manage, and protect your
            sensitive configuration data.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-400/20 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                {feature.icon}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white ml-3">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-white via-gray-100 to-gray-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-xl p-6 md:p-10 shadow-xl border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-6">
            🚀 Why Choose{" "}
            <span className="text-indigo-500 dark:text-indigo-400">
              Storenv?
            </span>
          </h2>

          <div className="prose prose-lg prose-indigo dark:prose-invert max-w-none text-center md:text-left">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                Storenv
              </span>{" "}
              was built with <strong>security</strong> and{" "}
              <strong>ease of use</strong> in mind. Managing environment
              variables across multiple projects and environments can be
              challenging—Storenv simplifies the process with a{" "}
              <span className="underline decoration-indigo-400">secure</span>{" "}
              and{" "}
              <span className="underline decoration-indigo-400">
                centralized
              </span>{" "}
              solution.
            </p>

            {/* Features Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { staggerChildren: 0.15 },
                },
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {[
                "🔒 Securely store & manage environment variables",
                "⚙️ Control access with fine-grained permissions",
                "📜 Track changes with version history",
                "🔗 Integrate seamlessly with existing workflows",
                "🌍 Manage multiple environments effortlessly",
                "✅ Ensure compliance with security standards",
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow-sm"
                >
                  <span className="text-indigo-600 dark:text-indigo-400 text-lg">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <p className="text-gray-700 dark:text-gray-300 mt-6 leading-relaxed text-center md:text-left">
              Whether you&apos;re a{" "}
              <strong className="text-indigo-600 dark:text-indigo-400">
                solo developer
              </strong>{" "}
              or part of a
              <strong className="text-indigo-600 dark:text-indigo-400">
                {" "}
                large team
              </strong>
              , Storenv gives you the tools to manage your environment variables{" "}
              <span className="underline decoration-indigo-400">
                securely
              </span>{" "}
              and{" "}
              <span className="underline decoration-indigo-400">
                efficiently
              </span>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
